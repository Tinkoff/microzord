import {Plugin, Compiler} from 'webpack';
import {RawSource} from 'webpack-sources';
import {join, parse} from 'path';

export class RooferWebpackPlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.emit.tap('HtmlWebpackPlugin', compilation => {
      compilation.fileDependencies.add('some-file.js');

      const {publicPath = '', assets} = compilation.getStats().toJson();

      (compilation as any).emitAsset(
        'roofer.json',
        new RawSource(
          JSON.stringify(
            assets
              .map(({name}) => join(publicPath, name))
              .filter(name => ['.js', '.css'].includes(parse(name).ext))
              .reverse(),
          ),
        ),
      );
    });
  }
}
