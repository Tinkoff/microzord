const {WebpackShivaBuilderPlugin} = require('../../dist/libs/angular/builder/browser');

const getWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = config => {
  config = getWebpackConfig(config);

  config.plugins.push(new WebpackShivaBuilderPlugin());

  config.output.jsonpFunction = Math.random().toString();

  return config;
};
