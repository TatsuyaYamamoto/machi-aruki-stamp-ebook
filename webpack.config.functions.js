const path = require("path");
const nodeExternals = require("webpack-node-externals");

const plugins = [];

module.exports = {
  mode: "development",

  target: "node",

  devtool: "inline-source-map",

  entry: "./app/index.functions.ts",

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist", "functions"),
    libraryTarget: "this"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  },

  externals: [nodeExternals()],

  plugins
};
