import {Plugin, Compiler} from 'webpack';
import {RawSource} from 'webpack-sources';
import * as minimatch from 'minimatch';
import {join} from 'path';

export interface Asset {
  pattern: string;
  external?: boolean;
}

export interface MicrozordWebpackPluginOptions {
  groups?: Array<Array<string | Asset>>;
  assetMapName?: string;
}

export class MicrozordWebpackPlugin implements Plugin {
  constructor(private config: MicrozordWebpackPluginOptions = {}) {
    this.config.groups ??= [];
    this.config.assetMapName ??= 'microzord.json';
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tap(MicrozordWebpackPlugin.name, compilation => {
      const {
        publicPath = '',
        assets: webpackAssets = [],
      } = compilation.getStats().toJson();

      const groups = this.config.groups?.map(group =>
        group
          .map(assetName => {
            const asset =
              typeof assetName === 'string' ? {pattern: assetName} : assetName;

            if (asset.external) {
              return [join(publicPath, asset.pattern)];
            }

            return webpackAssets
              .filter(webpackAsset => minimatch(webpackAsset.name, asset.pattern))
              .map(({name}) => join(publicPath, name));
          })
          .reduce((acc, curr) => acc.concat(curr), []),
      );

      (compilation as any).emitAsset(
        this.config.assetMapName ?? 'microzord.json',
        new RawSource(JSON.stringify({groups})),
      );
    });
  }
}
