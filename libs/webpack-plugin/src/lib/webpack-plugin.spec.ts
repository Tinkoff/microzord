import {ShivaWebpackPlugin} from './webpack-plugin';

describe('webpackPlugin', () => {
  it('should work', () => {
    expect(new ShivaWebpackPlugin()).toBeInstanceOf(ShivaWebpackPlugin);
  });
});
