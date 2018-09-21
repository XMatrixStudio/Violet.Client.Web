const fs = require('fs')
const glob = require("glob")

const pages = {}
let entries
try {
  // 获取相关入口
  entries = glob('src/pages/*/main.js', {sync: true})
} catch (err) {
  entries = []
  throw err
}
// 格式化生成入口
entries.forEach((file) => {
  const fileSplit = file.split('/')
  const pageName = fileSplit[2]
  let pageHtml = fileSplit.slice(0, 3).join('/') + '/index.html'
  pages[pageName] = {
    entry: file,
    template: pageHtml,
    filename: pageName === 'index' ? 'index.html' :`${pageName}/index.html`
  }
})

module.exports = {
  pages
}
