import path from 'path'

// @ts-ignore
import glob from 'glob-all'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import Webpackbar from 'webpackbar'

import babelConfig from './babel.config'
import pkg from './package.json'
import htmlTags from './config/htmlTags.json'

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production' // prettier-ignore
const development = mode === 'development'
const sourceMap = true

const buildPath = path.join(__dirname, 'dist', mode)

function outputFilename(development: boolean, ext = 'js') {
  if (development) {
    return `content/[name].${ext}`
  }
  return `content/[chunkhash:8].${ext}`
}

export default {
  mode: mode,
  bail: true,
  name: 'web',
  target: 'web',
  devtool: 'cheap-module-source-map',
  stats: 'errors-warnings',
  performance: {
    hints: false,
  },

  entry: path.join(__dirname, 'src/index.tsx'),

  output: {
    path: buildPath,
    filename: outputFilename(development),
    chunkFilename: outputFilename(development),
    publicPath: '/',
    pathinfo: false,
  },

  devServer: {
    contentBase: buildPath,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    lazy: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    port: 3000,
    quiet: false,
    logLevel: 'warn',
    clientLogLevel: 'warning',
    writeToDisk: true,
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ...babelConfig,
              compact: false,
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: sourceMap,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap, importLoaders: 2 },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap, keepQuery: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap },
          },
        ].filter(Boolean),
      },
      {
        test: /\.(eot|otf|webp|ttf|woff\d?|svg|png|jpe?g|gif)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: path.join('assets', development ? '[name].[ext]' : '[name].[hash:7].[ext]'), // prettier-ignore
          publicPath: '/',
        },
      },
    ],
  },

  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.mjs', '.jsx', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.ejs'),
      filename: path.join(buildPath, 'index.html'),
      inject: true,
      vars: {
        title: pkg.name,
      },
    }),

    new MiniCssExtractPlugin({
      filename: outputFilename(development, 'css'),
      chunkFilename: outputFilename(development, 'css'),
    }),

    new PurgecssPlugin({
      paths: () => [...glob.sync('src/**/*.{js,ts,jsx,tsx}', { nodir: true })],
      whitelist: htmlTags,
    }),

    new Webpackbar({ name: pkg.name }),
  ].filter(Boolean),
}
