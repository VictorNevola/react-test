const { resolve } = require("path");
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: resolve(__dirname, "../../src"),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@assets': resolve(__dirname, '../../src/assets'),
      '@components': resolve(__dirname, '../../src/components'),
      '@pages': resolve(__dirname, '../../src/pages'),
      '@services': resolve(__dirname, '../../src/services'),
      '@store': resolve(__dirname, '../../src/store'),
      '@contexts': resolve(__dirname, '../../src/contexts'),
      '@resources': resolve(__dirname, '../../src/resources'),
      '@repositories': resolve(__dirname, '../../src/repositories'),
    }
  },
  module: {
    rules: [{
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
          ],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../../src/html/index.html.ejs")
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    })
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
};