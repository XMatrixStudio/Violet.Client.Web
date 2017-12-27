const state = {
  name: 'Violet User System',
  detail: 'Violet 中央授权系统',
  id: false,
  state: '',
  redirectUri: ''
}

const getters = {}

const actions = {

}

const mutations = {
  setClientInfo (state, data) {
    state.name = data.name
    state.detail = data.detail
  },
  setUrlInfo (state, data) {
    state.id = data.clientId
    state.state = data.state
    state.redirectUri = data.redirectUri
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
