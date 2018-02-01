const userService = require('./modules/user')
const devService = require('./modules/dev')
const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService.default,
      dev: devService.default,
      errorHandle: this.errorHandle
    }
  },
  errorHandle: function (error, callback) {
    console.error(error)
    if (error.response && error.response.status === 400) {
      if (callback) {
        callback(error.response.data)
      } else {
        this.$Notice.error({
          title: this.$store.getters.language.Notice.failed,
          desc: this.$store.getters.language.Notice.error.unknown + error.response.data
        })
      }
    } else {
      this.$Notice.error({
        title: this.$store.getters.language.Notice.failed,
        desc: this.$store.getters.language.Notice.error.server
      })
    }
  }
}
export default service
