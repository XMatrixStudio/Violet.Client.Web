const state = {
  language: 'zh',
  data: {
    zh: {
      Notice: {
        failed: '发生错误',
        error: {
          unknown: '未知错误，请联系管理员，错误参数：',
          server: '无法连接到服务器，请稍后重试.',
          logTimeout: '登陆已过时，请重新登陆.'
        }
      },
      User: {
        home: '我的主页',
        setting: '用户设置',
        website: '授权网站',
        dev: '开发者设置',
        logout: '退出登陆',
        modal: {
          title: '退出确认',
          content: '是否退出登陆？',
          button: '退出'
        },
        avatar: '更新你的照片',
        upload: {
          hint: '点击，或拖动图片至此处！',
          loading: '正在上传……',
          noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
          success: '上传成功',
          fail: '图片上传失败',
          preview: '头像预览',
          btn: {
            off: '取消',
            close: '关闭',
            back: '上一步',
            save: '保存'
          },
          error: {
            onlyImg: '仅限图片格式',
            outOfSize: '单文件大小不能超过 ',
            lowestPx: '图片最低像素为（宽*高）：'
          }
        }
      },
      Profile: {
        email: '邮箱',
        url: '主页',
        phone: '手机号码',
        location: '位置',
        birthDate: '生日',
        bio: '个人简介',
        className: ['Violet用户', '开发者', '管理员', '最高管理员', '神秘用户']
      }
    }
  }
}

const getters = {
  language () {
    return state.data[state.language]
  }
}

const actions = {

}

const mutations = {
  setLanguage (state, data) {
    state.language = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
