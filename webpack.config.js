const path = require("path");

module.exports = {
  resolve: {
    // extensions: [".ts", ".js", "*"],
    modules: [path.resolve(__dirname, "routes"), "node_modules"],
  },
};
