const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const htmlParams = {
  noIndex: true,
  title: "DEVELOPMENT [非公式] 沼津まちあるきマップ",
  metaDescription:
    "'沼津まちあるきスタンプ'の店舗が分かる、非公式地図アプリです。沼津の街を歩いてスタンプを集めよう！",
  metaKeyword:
    "ラブライブ,ラブライブサンシャイン,lovelive,聖地巡礼,沼津,Aqours,まちあるき,ラブライバー,沼津,高海千歌,桜内梨子,松浦果南,黒澤ダイヤ,渡辺曜,津島善子,国木田花丸,小原鞠莉,黒澤ルビィ",
  ogTitle: this.title,
  ogSiteName: this.title,
  ogDescription: this.metaDescription,
  ogUrl: "https://numazu-machi-aruki.web.app",
  ogImage: "https://numazu-machi-aruki.web.app/assets/og.jpg",
  trackingCode: "" // TODO
};

if (isProduction) {
  Object.assign(htmlParams, {
    noIndex: false,
    title: "[非公式] 沼津まちあるきマップ",
    trackingCode: "" // TODO
  });
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "app/index.ejs",
    templateParameters: htmlParams,
    hash: true
  })
];

module.exports = {
  mode: "development",

  target: "web",

  devtool: "source-map",

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
