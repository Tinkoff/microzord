const {ShivaWebpackPlugin} = require('../../dist/libs/webpack-plugin');

const getWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = config => {
  config = getWebpackConfig(config);

  config.plugins.push(new ShivaWebpackPlugin());

  config.output.jsonpFunction = Math.random().toString();

  return config;
};
