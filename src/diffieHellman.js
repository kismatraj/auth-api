const crypto = require("crypto");

const server = crypto.getDiffieHellman("modp15");
const client = crypto.getDiffieHellman("modp15");

//Generate Keys(private and public key )
server.generateKeys();
client.generateKeys();

//Generate Keys public key
const serverPublicKey = server.getPublicKey().toString("base64");
const clientPublicKey = client.getPublicKey().toString("base64");

//Compute shared secret
const serverSharedKey = server.computeSecret(clientPublicKey, "base64", "hex");
const clientSharedKey = client.computeSecret(serverPublicKey, "base64", "hex");

console.log(serverSharedKey == clientSharedKey);

console.log("Server", serverSharedKey);
console.log("Client", clientSharedKey);
