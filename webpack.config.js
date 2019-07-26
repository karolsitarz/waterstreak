/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env, argv) => {
  const production = argv.mode === "production";
  return {
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
              loader: "babel-loader",
              options: {
                envName: production ? "production" : "development"
              }
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
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      production ? undefined : new webpack.NamedModulesPlugin(),
      production
        ? new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
              "bundle.*.js",
              "bundle.*.js.br",
              "bundle.*.js.gz",
              "bundle.js",
              "bundle.js.br",
              "bundle.js.gz"
            ]
          })
        : undefined,
      production
        ? new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
          })
        : undefined,
      production
        ? new BrotliPlugin({
            asset: "[path].br[query]",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
          })
        : undefined,
      production
        ? new SWPrecacheWebpackPlugin({
            cacheId: require("./package.json").name,
            minify: true
          })
        : undefined
    ].filter(Boolean),
    mode: production ? "production" : "development",
    devtool: production ? "none" : "cheap-module-eval-source-map",
    output: {
      path: path.join(__dirname, "./dist"),
      filename: production ? "bundle.[chunkhash].js" : "bundle.js"
    },
    devServer: {
      contentBase: "./dist",
      open: true
    }
  };
};
