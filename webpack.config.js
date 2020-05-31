// entry -> output
// entry -> loaders -> output
// entry -> loaders -> plugins -> output

const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js", // '.' means here
  output: {
    path: path.join(__dirname, "public", "scripts"), // absolute path to output, you can use __dirname instead of '.'
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
