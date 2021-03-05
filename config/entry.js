const paths = require('./paths')

// 入口名字
const entryName = ['admin', 'account', 'index']
// 入口路径
const entryPath = 'src/page/$entryName/index'


module.exports = {
  // 页面设置
  htmlConfig: function () {
    return entryName.map(val => ({
      filename: val + '.html',
      chunks: [val],
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }))
  },
  // 入口设置
  entryConfig: function (before = []) {
    let entry = {}
    entryName.forEach(val => {
      entry[val] = [...before, paths.resolveModule(paths.resolveApp,
        entryPath.replace(/\$entryName/g, val))]
    })
    return { entry }
  },
  // 重写路径设置
  devRewriteConfig: function () {
    return {
      rewrites: entryName.map(val => ({
        from: new RegExp('^\/' + val),
        to: '/' + val + '.html'
      }))
    }
  }
}