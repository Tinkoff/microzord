import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
import {executeBrowserBuilder} from '@angular-devkit/build-angular';
import {Schema as BrowserBuilderSchema} from '@angular-devkit/build-angular/src/browser/schema';
import {Configuration} from 'webpack';
import {WebpackShivaBuilderPlugin} from './webpack-shiva-builder-plugin';
export {WebpackShivaBuilderPlugin} from './webpack-shiva-builder-plugin';
import {BrowserBuilderOutput} from '@angular-devkit/build-angular';
import {Observable} from 'rxjs';

export const buildShiva = createBuilder(
  (
    options: BrowserBuilderSchema & JsonObject,
    context: BuilderContext,
  ): Observable<BrowserBuilderOutput> => {
    return executeBrowserBuilder(options, context, {
      webpackConfiguration(input: Configuration) {
        input.plugins.push(new WebpackShivaBuilderPlugin());

        input.output.jsonpFunction = Math.random().toString();

        return input;
      },
    });
  },
);

// export default почему не попадает в бандл
module.exports.default = buildShiva;
