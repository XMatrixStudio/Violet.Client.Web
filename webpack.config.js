const { webpackConfig, webpackMerge, htmlOverlay } = require('just-scripts')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const entry = require('./config/entry')
const path = require('path')

module.exports = webpackMerge(
  webpackConfig,
  ...entry.htmlConfig(),
  {
    // 自定义配置
    ...entry.entryConfig(),
    output: {
      publicPath: '/',
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
    },
    plugins: [
      // 清理历史构建
      new CleanWebpackPlugin(),
      // 打包大小分析
      // new BundleAnalyzerPlugin(),
    ],
    // 分块加载优化
    optimization: {
      splitChunks: {
        chunks: 'all'
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
