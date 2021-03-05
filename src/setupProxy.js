const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy.createProxyMiddleware('/api', {
    target: 'http://129.204.1.132:40002'
  }))
  app.use(proxy.createProxyMiddleware('/ip', {
    target: 'http://www.36ip.cn',
    changeOrigin: true,
    pathRewrite: {
      '^/ip': ''
    }
  }))
};