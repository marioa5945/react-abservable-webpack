import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const devMode = process.env.NODE_ENV !== 'production';
const configuration: webpack.Configuration = {
  mode: 'development',
  entry: ['./src/app.tsx'],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': resolve('./src/components'),
      '@type': resolve('./src/store/type/index'),
      '@ajax': resolve('./src/utils/ajax'),
      '@reducers': resolve('./src/store/reducers/index'),
      '@fun': resolve('./src/utils/public-fun'),
      '@src': resolve('./src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: devMode ? 'template/dev.html' : 'template/index.html',
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      DEV_MODE: devMode,
    }),
  ],
  output: {
    filename: devMode
      ? 'js/[name].bundle.js'
      : 'js/[name].[contenthash].bundle.js',
    path: resolve('.', 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /node-modules/,
        use: [
          devMode
            ? {
                loader: 'style-loader',
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              url: { filter: (url) => !url.startsWith('/') },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (devMode) {
                  return 'img/[path][name].[ext]';
                }
                return 'img/[contenthash].[ext]';
              },
              limit: false,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '_': 'lodash',
    'moment': 'moment',
  },
};

export default configuration;
