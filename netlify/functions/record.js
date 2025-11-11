import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
  PublicKey,
  sendAndConfirmTransaction
} from "@solana/web3.js";

const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

function getEnv() {
  const network = process.env.SOLANA_NETWORK || "devnet";
  const rpc =
    process.env.SOLANA_RPC ||
    (network === "devnet"
      ? "https://api.devnet.solana.com"
      : "https://api.mainnet-beta.solana.com");
  const secret = process.env.SOLANA_PRIVATE_KEY;
  if (!secret) throw new Error("Missing SOLANA_PRIVATE_KEY env var");

  let secretBytes;
  try {
    secretBytes = Uint8Array.from(JSON.parse(secret));
  } catch {
    throw new Error("SOLANA_PRIVATE_KEY must be a JSON array of bytes");
  }
  const payer = Keypair.fromSecretKey(secretBytes);
  return { rpc, payer };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { hash } = JSON.parse(event.body || "{}");
    if (!hash || typeof hash !== "string" || hash.length < 10) {
      return { statusCode: 400, body: "Invalid hash" };
    }

    const { rpc, payer } = getEnv();
    const connection = new Connection(rpc, "confirmed");

    const memoText = `VERIFY:${hash}`;
    const ix = new TransactionInstruction({
      keys: [],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(memoText, "utf8")
    });

    const tx = new Transaction().add(ix);
    const sig = await sendAndConfirmTransaction(connection, tx, [payer]);

    let blockTime = null;
    try {
      const conf = await connection.getSignatureStatus(sig);
      const slot = conf?.value?.slot;
      if (slot) blockTime = await connection.getBlockTime(slot);
    } catch {}

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        signature: sig,
        explorer: `https://explorer.solana.com/tx/${sig}?cluster=devnet`,
        memo: memoText,
        blockTime
      })
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: `Error: ${e.message}` };
  }
}
