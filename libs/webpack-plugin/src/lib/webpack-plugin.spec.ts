import {MicrozordWebpackPlugin} from './webpack-plugin';

describe('webpackPlugin', () => {
  it('should work', () => {
    expect(new MicrozordWebpackPlugin()).toBeInstanceOf(MicrozordWebpackPlugin);
  });
});
