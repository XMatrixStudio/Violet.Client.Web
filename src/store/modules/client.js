const state = {
  name: 'Violet User System',
  detail: 'Violet 中央授权系统',
  url: ''
}

const getters = {}

const actions = {}

const mutations = {
  setClientInfo (state, status) {
    state.name = status.name
    state.detail = status.detail
    state.url = status.url
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
