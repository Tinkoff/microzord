import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
import {executeDevServerBuilder} from '@angular-devkit/build-angular';
import {Configuration} from 'webpack';
import {Observable} from 'rxjs';
import {WebpackShivaBuilderPlugin} from './webpack-shiva-builder-plugin';
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
} from '@angular-devkit/build-angular/src/dev-server';

export const buildShiva = createBuilder(
  (
    options: DevServerBuilderOptions & JsonObject,
    context: BuilderContext,
  ): Observable<DevServerBuilderOutput> => {
    return executeDevServerBuilder(options, context, {
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
