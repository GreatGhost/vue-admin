const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  lintOnSave: false,
  publicPath: "./",
  chainWebpack: (config) => {
    const imgRule = config.module.rule("images");
    var isProd = process.env.NODE_ENV === "production" ? true : false;
    isProd=false;
    if (isProd) {
      imgRule
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          bypassOnDebug: true,
          mozjpeg: { progressive: true, quality: 65 }, //Compress JPEG images
          optipng: { enabled: false }, // Compress PNG images
          pngquant: { quality: [0.65, 0.9], speed: 4 }, // Compress PNG images
          gifsicle: { interlaced: false } // Compress SVG images
          //					webp: { quality: 75 }
        })
        .end();
    }
    if(process.env.NODE_ENV==='development'){
      config
      .plugin("webpack-bundle-analyzer")
      .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }

    config.plugins.delete("prefetch");
  },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: [".ts", ".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets")
      }
    };
    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "vue-quill-editor": "VueQuillEditor",
      "element-ui": "ELEMENT",
      "sockjs-client": "sockjsClient"
    };
    //config.optimization.minimize(true);
    config.optimization.minimizer.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            // 删除注释
            comments: false
          },
          //生产环境自动删除console
          compress: {
            //warnings: false, // 若打包错误，则注释这行
            drop_debugger: true, //清除 debugger 语句
            drop_console: true, //清除console语句
            pure_funcs: ["console.log"]
          }
        },
        sourceMap: false,
        parallel: true
      })
    );

    const productionGzipExtensions = ["js", "css"]; //压缩的文件类型
    config.plugins.push(
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      })
    );
    config.devServer= { // 设置代理
      hot: true, //热加载
      host: 'localhost', //ip地址
      port: 8080, //端口
      https: true, //false关闭https，true为开启
      open: true, //自动打开浏览器
      // proxy: {	 //配置多个跨域
      //   '/api': { //本地 
      //     //target: 'http://172.168.10.150:81/ysol_wx',
      //     //target: 'http://yishanonline.cn/ysol_wx',
      //     target: 'https://yishanol.cn/ysol_wx',
      //     ws: true,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // }
    }
  }
};
