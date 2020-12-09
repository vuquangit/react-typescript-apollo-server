const path = require('path');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', path.join(__dirname, 'src/index.ts')],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [
    new StartServerPlugin({
      name: 'server.js',
      nodeArgs: ['--inspect'],
      signal: true,
    }),
    new cleanWebpackPlugin.CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true,
});
