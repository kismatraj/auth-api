const checkDatabaseForOrigin = (serverEntry) => {
  const whitelist = [
    process.env.WHITELISTED_SERVER1,
    process.env.WHITELISTED_SERVER2,
  ];
  if (whitelist.includes(serverEntry)) return true;
  return false;
};

const corsOptions = async (req, res, next) => {
  const cors = {
    allowedHeaders: [
      "origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    origin: function (req, callback) {
      let isWhitelisted = checkDatabaseForOrigin(req.header("Origin"));
      callback(null, { origin: isWhitelisted });
    },
  };

  next(cors);
};

module.exports = corsOptions;
