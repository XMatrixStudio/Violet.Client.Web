const state = {
  email: '',
  name: '',
  valid: '',
  userClass: '',
  emailTime: false,
  autoLogin: false,
  logged: false,
  loginTime: '',
  info: {},
  webList: [],
  devList: []
}

const getters = {}

const actions = {}

const mutations = {
  login (state, data) {
    state.email = data.email
    state.name = data.name
    state.valid = data.valid
    state.logged = true
    state.loginTime = new Date()
    state.info.avatar = data.avatar
  },
  logout (state) {
    state.email = ''
    state.name = ''
    state.valid = ''
    state.logged = false
    state.info.avatar = ''
  },
  setEmailTime (state, data) {
    state.emailTime = data
  },
  setAuto (state, data) {
    state.autoLogin = data
  },
  setUserInfo (state, data) {
    state.name = data.name
    state.email = data.email
    state.info = data.info
    state.userClass = data.userClass
    state.email = data.email
    // 刷新头像
    state.info.avatar = state.info.avatar + '?t=' + new Date().getTime()
  },
  setClientList (state, data) {
    state.webList = data
  },
  setDevList (state, data) {
    state.devList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
