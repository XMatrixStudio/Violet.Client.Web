const state = {
  logged: false,
  userName: '',
  email: '',
  nikeName: '',
  avatar: '',
  valid: '',
  emailTime: false
}

const getters = {}

const actions = {}

const mutations = {
  login (state, data) {
    state.email = data.email
    state.nikeName = data.nikeName
    state.avatar = data.avatar
    state.valid = data.valid
    state.logged = true
  },
  setEmailTime (state, data) {
    state.emailTime = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
