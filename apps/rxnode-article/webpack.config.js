const {MicrozordWebpackPlugin} = require('../../dist/libs/webpack-plugin');

const getWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = config => {
  config = getWebpackConfig(config);

  config.plugins.push(
    new MicrozordWebpackPlugin({
      groups: [
        ['style*.css', 'runtime*.js'],
        ['polyfills*.js', 'vendor*.js', 'main*.js'],
      ],
    }),
  );

  config.output.jsonpFunction = Math.random().toString();

  return config;
};
