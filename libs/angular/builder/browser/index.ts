import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
import {executeBrowserBuilder} from '@angular-devkit/build-angular';
import {Schema as BrowserBuilderSchema} from '@angular-devkit/build-angular/src/browser/schema';
import {Configuration} from 'webpack';
import {BrowserBuilderOutput} from '@angular-devkit/build-angular';
import {Observable} from 'rxjs';

// for local development
let Plugin: any;
try {
  Plugin = require('@microzord/webpack-plugin').MicrozordWebpackPlugin;
} catch (e) {
  Plugin = require('../../webpack-plugin').MicrozordWebpackPlugin;
}

export const buildZord = createBuilder(
  (
    options: BrowserBuilderSchema & JsonObject,
    context: BuilderContext,
  ): Observable<BrowserBuilderOutput> => {
    return executeBrowserBuilder(options, context, {
      webpackConfiguration(input: Configuration) {
        input.plugins?.push(new Plugin(options.microzord));

        if (input.output) {
          input.output.jsonpFunction = Math.random().toString();
        }

        return input;
      },
    });
  },
);

// TODO: research why "export default" is not in the bundle
module.exports.default = buildZord;
