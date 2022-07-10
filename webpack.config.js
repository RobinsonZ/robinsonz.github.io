const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    style: path.resolve(__dirname, "./assets/index.css"),
    script: path.resolve(__dirname, "./assets/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: isProduction ? "[name].[hash].js" : "[name].js",
    chunkFilename: isProduction ? "[id].[hash].js" : "[id].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? "[name].[hash].css" : "[name].css",
    }),
    new ManifestPlugin.WebpackManifestPlugin({
      fileName: "../_data/manifest.yml",
      publicPath: "./dist/",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static/",
          to: "static/",
        },
      ],
    }),
  ],
};
