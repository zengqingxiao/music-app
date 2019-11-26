/* eslint-disable */
module.exports = {
  // lintOnSave: false, // 防止eslint-loader报错
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: false, // 允许跨域
        pathRewrite: {
          '/api': '/'
        },
        logLevel: 'debug'
      }
    }
  }
}
