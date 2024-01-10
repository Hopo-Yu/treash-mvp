import type { ForgeConfig } from '@electron-forge/shared-types';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},

  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.tsx',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],

  // Add the makers section here
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'treash',
        // Additional configuration options here
      },
      platforms: ['win32'],
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        // Configuration options for the zip maker
      },
      platforms: ['darwin', 'win32', 'linux'],
    },
    // Add other makers as needed for different platforms
  ],
};

export default config;
