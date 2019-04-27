const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: "app/index.ejs"
  })
];

module.exports = {
  mode: "development",

  target: "web",

  devtool: "inline-source-map",

  entry: "./app/index.client.tsx",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist", "public")
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
    contentBase: "public",
    historyApiFallback: true
  },

  plugins
};
