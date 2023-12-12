const redis = require("redis");

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST_URL,
});

client.on("connected", () => {
  console.log("Client is connected to redis");
});

client.on("ready", () => {
  console.log("Client is connected to redis and ready to use");
});

client.on("error", (err) => {
  console.log("Something went wrong", err);
});

client.on("end", (err) => {
  console.log("Client is disconnected", err);
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
