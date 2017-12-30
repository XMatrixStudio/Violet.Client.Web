const state = {
  logged: false,
  loginTime: '',
  userName: '',
  email: '',
  nikeName: '',
  avatar: '',
  valid: '',
  emailTime: false,
  autoLogin: false
}

const getters = {}

const actions = {}

const mutations = {
  login (state, data) {
    state.email = data.email
    state.nikeName = data.name
    state.avatar = data.avatar
    state.valid = data.valid
    state.logged = true
    state.loginTime = new Date()
  },
  logout (state) {
    state.email = ''
    state.nikeName = ''
    state.avatar = ''
    state.valid = ''
    state.logged = false
  },
  setEmailTime (state, data) {
    state.emailTime = data
  },
  setAuto (state, data) {
    state.autoLogin = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
