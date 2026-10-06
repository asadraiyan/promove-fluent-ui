const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), 
    },
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
