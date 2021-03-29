import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
import {executeBrowserBuilder} from '@angular-devkit/build-angular';
import {Schema as BrowserBuilderSchema} from '@angular-devkit/build-angular/src/browser/schema';
import {Configuration} from 'webpack';
import {BrowserBuilderOutput} from '@angular-devkit/build-angular';
import {Observable} from 'rxjs';
import {ShivaWebpackPlugin} from '@tinkoff-shiva/webpack-plugin';

export const buildShiva = createBuilder(
  (
    options: BrowserBuilderSchema & JsonObject,
    context: BuilderContext,
  ): Observable<BrowserBuilderOutput> => {
    return executeBrowserBuilder(options, context, {
      webpackConfiguration(input: Configuration) {
        input.plugins.push(new ShivaWebpackPlugin());

        input.output.jsonpFunction = Math.random().toString();

        return input;
      },
    });
  },
);

// export default почему не попадает в бандл
module.exports.default = buildShiva;
