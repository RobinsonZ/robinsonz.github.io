const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LicensePlugin = require("webpack-license-plugin");

const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

const txtLicenseTransform = (packages) =>
  packages
    .map(
      (package) =>
        `${package["name"]} ${package["version"]}\n${package["repository"]}\n${package["licenseText"]}`
    )
    .join("\n\n");

const clientRedirect = (slug, target) =>
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src/redirect.html"),
    filename: `${slug}.html`,
    chunks: [], // don't load JS
    templateParameters: {
      redirectUrl: target,
    },
  });

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "[name][ext][query]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    clientRedirect("slate", "https://medium.com/@zkislakrobinson/developing-slate-f751be5fa3db"),
    // licenses.txt
    new LicensePlugin({
      additionalFiles: {
        "licenses.txt": txtLicenseTransform,
      },
      includePackages: () => ["node_modules/tailwindcss"],
    }),
  ].concat(isProduction ? [new MiniCssExtractPlugin()] : []),
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|json)$/i,
        type: "asset",
      },
      {
        test: /\.pdf$/i,
        type: "asset/resource",
      },
    ],
  },
};
