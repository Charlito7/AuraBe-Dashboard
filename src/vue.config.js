const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
// Uncomment if you want to analyze bundle
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
      // Uncomment if you want to analyze bundle
      // new BundleAnalyzerPlugin(),
    ],

    optimization: {
      splitChunks: {
        chunks: "all", // split all types of chunks (async + initial)
        automaticNameDelimiter: "-",
        maxSize: 300000, // ~300 KB max per chunk
      },
    },
  },

  // Optional: gzip compression of output files (you need compression-webpack-plugin)
  // chainWebpack: config => {
  //   config.plugin("compression").use(require("compression-webpack-plugin"), [
  //     {
  //       test: /\.(js|css|html|svg)$/,
  //       threshold: 10240, // compress files over 10 KB
  //       minRatio: 0.8,
  //     },
  //   ]);
  // },
});
