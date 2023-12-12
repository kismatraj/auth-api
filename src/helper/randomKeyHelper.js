module.exports = {
  numericUid: () => {
    return `${performance.now()}${Math.random().toString().slice(5)}`.replace(
      ".",
      ""
    );
  },
};
