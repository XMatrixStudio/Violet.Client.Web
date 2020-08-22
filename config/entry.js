/***
 * 多入口设置
 */
const { htmlOverlay } = require('just-scripts');
// 入口名字
const entryName = ['admin', 'account', 'index']
// 入口路径
const entryPath = './src/index'

module.exports = {
    // 页面设置
    htmlConfig: function () {
        return entryName.map(val => htmlOverlay({
            filename: val + '.html',
            chunks: [val],
            template: 'public/index.html',
            favicon: 'public/favicon.svg'
        }))
    },
    // 入口设置
    entryConfig: function () {
        let entry = {}
        entryName.forEach(val => {
            // TODO 配置入口路径
            entry[val] = [entryPath.replace(/\$entryName/g, val)]
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