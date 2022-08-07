import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.server';
import serverPrint from 'server-print';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bodyParser from 'body-parser';

const app = express();
const compiler = webpack(webpackConfig);
const port = '9000';
const publicPath = webpackConfig.output ? webpackConfig.output.publicPath : '/';

app.use(express.static('public')); // static

// API
app.use(
  createProxyMiddleware('/api/', {
    target: `http://localhost:${port}/`,
    pathRewrite: {
      '^/api/': '/json/', // rewrite path
    },
    changeOrigin: true,
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
});

// Rewrite the url to the page url of index.html
app.get('*', (req, res, next) => {
  if (req.url !== '/__webpack_hmr' && req.url.indexOf('.') === -1) {
    req.url = '/';
  }
  next();
});

// Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
  serverPrint({ port, copyType: 'localhost' });
});
