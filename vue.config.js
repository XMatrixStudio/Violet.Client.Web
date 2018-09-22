const glob = require('glob')

const pages = {}
let entries
try {
  // 获取相关入口
  entries = glob('src/pages/*/main.js', { sync: true })
} catch (err) {
  entries = []
  throw err
}
// 格式化生成入口
entries.forEach((file) => {
  let fileSplit = file.split('/')
  if (fileSplit[2].substring(fileSplit[2].length - 6) === 'Mobile') {
    fileSplit[2] = 'm/' + fileSplit[2].substring(0, fileSplit[2].length - 6)
  }
  const pageName = fileSplit[2]
  const pageHtml = fileSplit.slice(0, 3).join('/') + '/index.html'
  pages[pageName] = {
    entry: file,
    template: pageHtml,
    filename: pageName === 'index' ? 'index.html' : `${pageName}/index.html`
  }
})

module.exports = {
  pages
}
