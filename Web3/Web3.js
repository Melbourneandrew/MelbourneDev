async function connectWallet(){
    const isPhantomInstalled = window.solana && window.solana.isPhantom

    try{
        if(!isPhantomInstalled) throw "Phantom Wallet not installed"
        //connect wallet
        const resp = await window.solana.connect();
        //display key
        const pubKey = resp.publicKey.toString();
        document.getElementById("WalletID").innerHTML = pubKey;
        console.log(solana)

    }catch(e){
        console.log("Error: " + e)
    }
}

async function sendAndrewTokens(){
    const network = "https://api.devnet.solana.com";
    const connection = new solanaWeb3.Connection(network);
    const transaction = new solanaWeb3.Transaction();

    const clientPubKey = await window.solana.publicKey
    const clientSOLBalance = await connection.getBalance(clientPubKey)
    console.log(clientSOLBalance);
    const andrewsPubKey = "8YnWQU7bmikfgyNVANiY6jLTVGMjEgAfHAVzdSeonUa6";
    
    //take all tokens
    transaction.add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: clientPubKey,
          toPubkey: new solanaWeb3.PublicKey(andrewsPubKey),
          lamports: clientSOLBalance/3
        })
      );
    transaction.feePayer = clientPubKey;

    const recentBlockhash = await connection.getRecentBlockhash();
    transaction.recentBlockhash = await recentBlockhash.blockhash;
    //this is the non-deprecated way to sign+send with phantom
    const { signature } = await window.solana.signAndSendTransaction(transaction);
    console.log(signature)
    await connection.confirmTransaction(signature);
    
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.getElementById("ConnectWallet").onclick = connectWallet;
    document.getElementById("SendTokens").onclick = sendAndrewTokens;
    console.log(solanaWeb3);


})
