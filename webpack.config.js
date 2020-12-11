const path = require("path");

module.exports = {
  mode: `development`,
  entry : `./source/js/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `source`),
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `source`),
    watchContentBase: true,
  }
};
