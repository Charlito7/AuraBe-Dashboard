const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Add this new configuration:
  devServer: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self';",
        "connect-src 'self' https:;",
        "img-src 'self' data: https:;",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
        "font-src 'self' data: https://fonts.gstatic.com;",
        "frame-src 'self';",
      ].join(' ')
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: "-",
        maxSize: 300000,
      },
    },
  },
});