import webpack from 'webpack';
import config from './webpack.config';
import ESLintPlugin from 'eslint-webpack-plugin';

if (config.module && config.module.rules) {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node-modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
    ],
  });
}

if (config.plugins) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      exclude: '/node_modules/',
    })
  );
}

config.entry = [
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  './src/app.tsx',
];

export default { ...config };
