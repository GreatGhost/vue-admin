const webpack = require('webpack');
const path = require('path');
const  isPro=process.env.NODE_ENV==='production'?true:false;
module.exports = {
  lintOnSave: false,
  publicPath: './',
  chainWebpack: (config) => {
    const imgRule = config.module.rule('images');
    var isProd = process.env.NODE_ENV === 'production' ? true : false;
    isProd = false;
    if (isProd) {
      imgRule
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end();
    }
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.ts','.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname,'./src'),
        'assets':path.resolve(__dirname,'./src/assets')
      }
    };
  }
};
