const path = require('path')
const util = require('util');

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
    builder: 'webpack5',
  },
  addons: [
     '@storybook/addon-links',
     '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
     'storybook-addon-toolbar-actions/register',
     'storybook-addon-headless'
  ],
  webpackFinal: async (config) => {
    // console.log(util.inspect(config.resolve, {showHidden: false, depth: null, colors: true}))

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }, {
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          '@emotion/styled': toPath('node_modules/@emotion/styled'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    }
  },
}
