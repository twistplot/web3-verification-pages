async function sha256(file) {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

const fileInput = document.getElementById("fileInput");
const btn = document.getElementById("btnCreate");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");
const hashOut = document.getElementById("hashOut");
const sigOut = document.getElementById("sigOut");
const explorerLink = document.getElementById("explorerLink");
const certLink = document.getElementById("certLink");

btn?.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) { statusEl.textContent = "Please choose a file."; return; }
  statusEl.textContent = "Hashing file…";
  const hash = await sha256(file);

  statusEl.textContent = "Writing hash to blockchain… (devnet)";
  const r = await fetch("/api/record", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ hash })
  });

  if (!r.ok) {
    statusEl.textContent = "Error writing to chain.";
    return;
  }

  const data = await r.json();
  const sig = data.signature;

  result.classList.remove("hidden");
  hashOut.textContent = hash;
  sigOut.textContent = sig;
  explorerLink.href = data.explorer;
  certLink.href = `cert.html?sig=${encodeURIComponent(sig)}&hash=${encodeURIComponent(hash)}`;
  statusEl.textContent = "Done!";
});
