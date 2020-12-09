const path = require('path');

const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: [path.join(__dirname, 'src/index.ts')],
  externals: [nodeExternals({})],
  plugins: [new cleanWebpackPlugin.CleanWebpackPlugin()],
});
