import config from './webpack.config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

delete config.devtool;
config.mode = 'production';

if (config.module && config.module.rules) {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node-modules/,
    use: ['babel-loader'],
  });
}

if (config.plugins) {
  config.plugins.push(
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: './',
        },
      ],
    })
  );
}

export default { ...config };
