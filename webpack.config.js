/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

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
      })
    ].filter(Boolean),
    devtool:
      argv.mode === "production" ? "none" : "cheap-module-eval-source-map",
    output: {
      filename:
        argv.mode === "production" ? "bundle.[chunkhash].js" : "bundle.js"
    },
    devServer: {
      contentBase: "./dist",
      open: true
    }
  }
];
