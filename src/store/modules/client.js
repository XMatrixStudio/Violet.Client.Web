const state = {
  name: 'Violet User System',
  detail: 'Violet 中央授权系统',
  id: false,
  state: '',
  redirectUrl: ''
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
    state.redirectUrl = data.redirectUrl
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
