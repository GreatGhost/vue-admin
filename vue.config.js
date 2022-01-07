const webpack = require('webpack');
module.exports = {
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
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  }
};
