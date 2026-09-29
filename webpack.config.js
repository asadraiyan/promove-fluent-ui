const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",

    entry: path.resolve(__dirname, "src/index.tsx"),

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction
        ? "js/[name].[contenthash].js"
        : "js/[name].js",
      clean: true,
      publicPath: "/"
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: false
            }
          }
        },

        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },

        {
          test: /\.(png|jpe?g|gif|svg|ico|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][ext]"
          }
        },

        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext]"
          }
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        favicon: false,
        minify: isProduction
          ? {
            collapseWhitespace: true,
            removeComments: true
          }
          : false
      })
    ],

    devtool: isProduction ? "source-map" : "eval-source-map",

    devServer: {
      static: false,
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true
    },

    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },

    performance: {
      hints: isProduction ? "warning" : false
    }
  };
};