const { webpackMerge, htmlOverlay, webpackServeConfig } = require('just-scripts')
const entry = require('./config/entry')
const path = require('path')

module.exports = webpackMerge(
  webpackServeConfig,
  ...entry.htmlConfig(),
  {
    // Here you can custom webpack configurations
    ...entry.entryConfig(),
    output: {
      publicPath: '/',
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].chunk.js'
    },
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
        // 多入口重定向
        ...entry.devRewriteConfig()
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8099',
          pathRewrite: {
            '^/api': ''
          }
        },
        '/ip': {
          target: 'https://www.36ip.cn',
          pathRewrite: {
            '^/ip': ''
          }
        }
      }
    },
    resolve: {
      extensions: [".tsx", ".ts"],
      alias: {
          "@": path.join(__dirname, "./src")
      }
    }
  }
);
