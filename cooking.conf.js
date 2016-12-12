var path = require('path');
var cooking = require('cooking');

cooking.set({
    entry: {
        app: ['babel-polyfill', './src/mainNew.js']
    },
    externals: {
        'zepto': 'Zepto',
        'wx': 'jWeixin'
    },
    dist: './dist',
    template: './indexNew.tpl',

    devServer: {
        port: 9090,
        publicPath: '/'
    },

    // production
    clean: true,
    hash: true,
    sourceMap: true,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        // require('...')
    ],
    publicPath: '/dist/',
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    extractCSS: '[name].[contenthash:7].css',
    alias: {
        'src': path.join(__dirname, 'src'),
        'vue$': 'vue/dist/vue'
    },
    extends: ['vue2', 'less', 'autoprefixer']
});

module.exports = cooking.resolve();
