import {RooferWebpackPlugin} from './webpack-plugin';

describe('webpackPlugin', () => {
  it('should work', () => {
    expect(new RooferWebpackPlugin()).toBeInstanceOf(RooferWebpackPlugin);
  });
});
