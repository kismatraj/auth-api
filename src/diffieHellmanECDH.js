const crypto = require("crypto");

const server = crypto.createECDH("secp256k1");
const client = crypto.createECDH("secp256k1");

//Generate Keys
server.generateKeys();
client.generateKeys();

console.log("Server Private Key ", server.getPrivateKey().toString("base64"));
console.log("Server Public Key ", server.getPublicKey().toString("base64"));

console.log("Client Private Key ", client.getPrivateKey().toString("base64"));
console.log("Client Public Key ", client.getPublicKey().toString("base64"));

//Generate Public Key
const serverPublicKey = server.getPublicKey().toString("base64");
const clientPublicKey = client.getPublicKey().toString("base64");

// Compute Shared Key
const serverSharedKey = server.computeSecret(clientPublicKey, "base64", "hex");
const clientSharedKey = client.computeSecret(serverPublicKey, "base64", "hex");

console.log(serverSharedKey === clientSharedKey);

console.log("Server", serverSharedKey);
console.log("Client", clientSharedKey);

// Message encryption at server end
const message = "This is a secrete message";

// Create Initialization Vector(IV). It is same as salt to encryption. it can be public. it should be used only one time per message. This can be prepended to the text.
const IV = crypto.randomBytes(16); //32 bit random string

// Create Cipher
const cipher = crypto.createCipheriv(
  "aes-256-gcm",
  Buffer.from(serverSharedKey, "hex"),
  IV
);

// Encrypt the message
let encrypted = cipher.update(message, "utf-8", "hex");
encrypted += cipher.final("hex");

const authTag = cipher.getAuthTag().toString("hex");
console.table({
  IV: IV.toString("hex"),
  encrypted: encrypted,
  authTag: authTag,
});

const payload = IV.toString("hex") + encrypted + authTag;
const payloadBase64 = Buffer.from(payload, "hex").toString("base64");
console.log("Payload base64", payloadBase64);

// Message decryption at client end
const clientPayload = Buffer.from(payloadBase64, "base64").toString("hex");
const clientIV = clientPayload.substring(0, 32);
const clientEncrypted = clientPayload.substring(32, clientPayload.length - 32);
const clientAuthTag = clientPayload.substring(clientPayload.length - 32);

console.table({
  clientIV: clientIV,
  clientEncrypted: clientEncrypted,
  clientAuthTag: clientAuthTag,
});

try {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(clientSharedKey, "hex"),
    Buffer.from(clientIV, "hex")
  );

  // Check auth tag
  // decipher.setAuthTag(Buffer.from(clientAuthTag, "hex"));
  decipher.setAuthTag(crypto.randomBytes(16));

  // Decrypt the message
  let decrypted = decipher.update(clientEncrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  console.log("Decrypted message : ", decrypted);
} catch (error) {
  console.log(error.message);
}
