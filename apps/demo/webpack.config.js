const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'demo',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'demo',
      filename: 'remoteEntry.js',
      exposes: {
        './App': 'apps/demo/src/app/application.ts',
      },
      shared: {
        '@angular/core': {singleton: true, strictVersion: false},
        '@angular/common': {singleton: true, strictVersion: true},
        '@angular/common/http': {singleton: true, strictVersion: true},
        '@angular/router': {singleton: true, strictVersion: true},
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
