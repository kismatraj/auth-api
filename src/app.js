const app = require("./server");
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(
    `server is running at host http://${process.env.HOSTNAME}:${port}${process.env.API_VERSION}`
  );
});

/* Handling unhandled promise rejection  */
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err}`);
  console.log(`${err.stack}`);
  console.log("-------------------------");
  // console.log('Shutting down the server due to unhandled promise rejection');
});
