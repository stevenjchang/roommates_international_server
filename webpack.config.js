const path = require("path");

console.log(
  'path.resolve(__dirname, "routes") ==>',
  path.resolve(__dirname, "routes")
);

module.exports = {
  resolve: {
    // extensions: [".ts", ".js", "*"],
    modules: [path.resolve(__dirname, "routes"), "node_modules"],
  },
};
