# Web3 Verification Pages (Solana Devnet)

This is a simple project that lets anyone create blockchain-verified certificates for any file.  
It works by hashing the uploaded file (SHA-256) and storing that hash on the Solana blockchain using the Memo program.

## 🔧 How it works
1. You upload a file on the website.
2. The file’s SHA-256 hash is calculated in your browser.
3. The hash is sent to the backend function `/api/record`.
4. The backend writes that hash to Solana (devnet) in a transaction memo like `VERIFY:<hash>`.
5. You receive a permanent certificate link with the Solana transaction ID.

## 🪙 Verification
Anyone can upload the same file later.  
If the SHA-256 hash matches what’s stored on Solana, the page shows ✅ Verified on-chain.

## ⚙️ Environment Variables (for Netlify)
- **SOLANA_NETWORK=devnet**
- **SOLANA_RPC=https://api.devnet.solana.com**
- **SOLANA_PRIVATE_KEY** = your wallet secret key (JSON array)

## 🚀 Deployment Steps
1. Connect your GitHub repo to Netlify.
2. Set the environment variables above.
3. Deploy and open your site — you’re live!

## 🧠 Technologies
- Sola
- 
