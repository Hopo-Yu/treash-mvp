import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
    test: /\.geojson$/,
    use: 'json-loader',
})

rules.push({
  test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ],
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      "util": require.resolve("util/"),
      "url": require.resolve("url/"),
      "os": require.resolve("os-browserify/browser"),
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify"),
      // Add other fallbacks as necessary
    }
  },
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path',
    electron: 'commonjs electron',
    // You can add other Node core modules here if needed
  }
};
