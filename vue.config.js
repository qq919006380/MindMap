const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, //匹配文件名
        threshold: 10240, //对超过10k的数据进行压缩
        deleteOriginalAssets: false, //是否删除原文件
      }),
    ],
  },
  chainWebpack: (config) => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === "production") {
      config.mode= 'production'
      if (process.env.npm_config_report) {
        config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin).end();
        config.plugins.delete("prefetch");
      }
    }
  },
});
