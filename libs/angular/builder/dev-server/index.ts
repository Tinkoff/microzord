import {
  BuilderContext,
  createBuilder,
  targetFromTargetString,
} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
import {executeDevServerBuilder} from '@angular-devkit/build-angular';
import {Configuration} from 'webpack';
import {from, Observable} from 'rxjs';
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
} from '@angular-devkit/build-angular/src/dev-server';
import {switchMap} from 'rxjs/operators';

// хак для локальной разработки
let Plugin: any;
try {
  Plugin = require('@roofer/webpack-plugin').RooferWebpackPlugin;
} catch (e) {
  Plugin = require('../../webpack-plugin').RooferWebpackPlugin;
}

export const buildRoofer = createBuilder(
  (
    options: DevServerBuilderOptions & JsonObject,
    context: BuilderContext,
  ): Observable<DevServerBuilderOutput> => {
    return from(
      context.getTargetOptions(targetFromTargetString(options.browserTarget)),
    ).pipe(
      switchMap(({roofer}) =>
        executeDevServerBuilder(options, context, {
          webpackConfiguration(input: Configuration) {
            input.plugins?.push(new Plugin(roofer));

            if (input.output) {
              input.output.jsonpFunction = Math.random().toString();
            }

            return input;
          },
        }),
      ),
    );
  },
);

// export default почему не попадает в бандл
module.exports.default = buildRoofer;
