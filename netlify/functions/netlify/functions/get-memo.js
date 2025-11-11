import { Connection } from "@solana/web3.js";

const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

function getRpc() {
  return process.env.SOLANA_RPC || "https://api.devnet.solana.com";
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const sig = (event.queryStringParameters?.sig || "").trim();
    if (!sig) return { statusCode: 400, body: "Missing sig" };

    const connection = new Connection(getRpc(), "confirmed");
    const tx = await connection.getTransaction(sig, {
      maxSupportedTransactionVersion: 0
    });

    if (!tx) return { statusCode: 404, body: "Transaction not found" };

    // Try to extract memo text from the transaction
    let memo = null;
    const ixList = tx.transaction.message.instructions || [];

    for (const ix of ixList) {
      // In JSON, programId may be a string; in some cases it's an index
      const pid =
        (ix.programId?.toString?.() ||
          ix.programId ||
          (ix.programIdIndex != null &&
            tx.transaction.message.accountKeys[ix.programIdIndex]?.toString())) || "";

      if (pid === MEMO_PROGRAM_ID) {
        const b64 = ix.data; // base64-encoded memo
        if (b64) {
          memo = Buffer.from(b64, "base64").toString("utf8");
          break;
        }
      }
    }

    // Fallback: sometimes memo appears in logs
    if (!memo && tx.meta?.logMessages) {
      const hit = tx.meta.logMessages.find((l) => l.includes("VERIFY:"));
      if (hit) memo = hit.substring(hit.indexOf("VERIFY:")).trim();
    }

    const blockTime = tx.blockTime || null;
    const slot = tx.slot;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, memo, blockTime, slot })
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: `Error: ${e.message}` };
  }
}
