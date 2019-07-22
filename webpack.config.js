/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env, argv) => [
  {
    name: "client",
    target: "web",
    entry: "./src/index",
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          use: ["source-map-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
      argv.mode === "production" ? undefined : new webpack.NamedModulesPlugin(),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "bundle.*.js",
          "bundle.*.js.br",
          "bundle.*.js.gz",
          "bundle.js",
          "bundle.js.br",
          "bundle.js.gz"
        ]
      }),
      argv.mode === "development"
        ? undefined
        : new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
          }),
      argv.mode === "development"
        ? undefined
        : new BrotliPlugin({
            asset: "[path].br[query]",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
          }),
      argv.mode === "development"
        ? undefined
        : new SWPrecacheWebpackPlugin({
            cacheId: require("./package.json").name,
            minify: true
          })
    ].filter(Boolean),
    mode: "development",
    devtool:
      argv.mode === "production" ? "none" : "cheap-module-eval-source-map",
    output: {
      path: path.join(__dirname, "./dist"),
      filename:
        argv.mode === "production" ? "bundle.[chunkhash].js" : "bundle.js"
    },
    devServer: {
      contentBase: "./dist",
      open: true
    }
  }
];
