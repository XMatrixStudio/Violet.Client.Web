const state = {
  email: '',
  name: '',
  valid: '',
  class: '',
  emailTime: false,
  autoLogin: false,
  logged: false,
  loginTime: '',
  info: {}
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
    state.class = data.class
    state.email = data.email
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
