const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const customConfig = {
  // entry: {
  //   home: './src/module/home/index',
  //   account: './src/module/account/index',
  //   admin: './src/module/admin/index',
  // },
  // output: {
  //   filename: '[name].bundle.js'
  // },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
}

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      console.log(env)
      if (env === 'production') {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
      }
      webpackConfig = Object.assign(webpackConfig, customConfig)
      return webpackConfig
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:40002',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
}