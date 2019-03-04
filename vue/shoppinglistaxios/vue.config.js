module.exports = {
  devServer: {
    proxy: {
      '^/api','^/login','^/register': {
        target: 'http://localhost:3000/'
      }
    }
  }
}