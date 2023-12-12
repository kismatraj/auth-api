const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
// const cors = require("cors");
const helmet = require("helmet");
// const createError = require("http-errors");
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const corsConfig = require("./config/corsConfig");
require("dotenv").config();
require("./config/init_mongoose");
// require("./config/init_redis");

const server = express();
server.use(morgan("dev"));

/*CORS Config */
// server.use(cors(corsConfig));

/* Configure Helmet */
server.use(helmet());
server.use(helmet.hidePoweredBy());

// Compression middleware
server.use(
  compression({
    level: 6, //0-No compression, 6 most optimized level of compression
    threshold: 100 * 1000, //threshold data size at which no compression should be serverlied.
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  })
);

// Built-in middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Application routes
const apiVersion = process.env.API_VERSION || "/api/v1";
server.use(apiVersion, routes);

server.use(errorHandler);

// server.listen(port, () => {
//   console.log(
//     `server is running at host http://${process.env.HOSTNAME}:${port}${process.env.API_VERSION}`
//   );
// });

module.exports = server;
