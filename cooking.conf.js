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
        /*
         * 根据cooking源码，调整devServer的监听地址，需要使用“hostname”，
         * 而非webpack-dev-server(CLI-Only)的参数“host”
         */
        hostname: '0.0.0.0',
        port: 9090,
        publicPath: '/',
        open: true
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
        'vue$': 'vue/dist/vue'  // 若需要使用template等编译语法，需要使用vue.js而非默认的vue.rutime.common.js
    },
    extends: ['vue2', 'less', 'autoprefixer']
});

module.exports = cooking.resolve();
