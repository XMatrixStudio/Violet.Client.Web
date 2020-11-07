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
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig = Object.assign(webpackConfig, customConfig)
      return webpackConfig
    }
  }
}