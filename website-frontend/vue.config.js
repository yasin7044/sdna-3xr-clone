// SPDX-License-Identifier: Apache-2.0
const path = require('path')
module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      symlinks: false, //npm link
    },
  },
  chainWebpack: config => {
    config.module
      .rule('supportchaining')
      .test(/\.js$/)
      .include.add(
        path.resolve(
          __dirname,
          'node_modules/@google/model-viewer/node_modules/three/examples/jsm/exporters/GLTFExporter.js',
        ),
      )
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .tap((options) => {
        return {
          ...options,
          plugins: ['@babel/plugin-proposal-optional-chaining'],
        };
      })
      .end();
  },
};