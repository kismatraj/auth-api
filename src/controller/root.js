module.exports = {
  get: async (re, res, next) => {
    res.status(201).json({ message: "GET service is running" });
  },

  compression: async (re, res, next) => {
    const message = "This is the simple data for testing purpose";
    res.status(201).json({ message: message.repeat(10000) });
  },

  post: async (re, res, next) => {
    res.status(201).json({ message: "POST service is running" });
  },

  patch: async (re, res, next) => {
    res.status(201).json({ message: "PATCH service is running" });
  },

  put: async (re, res, next) => {
    res.status(201).json({ message: "PUT service is running" });
  },

  delete: async (re, res, next) => {
    res.status(201).json({ message: "DELETE service is running" });
  },
};
