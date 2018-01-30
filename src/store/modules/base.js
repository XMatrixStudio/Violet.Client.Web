const state = {
  time: ''
}

const getters = {}

const actions = {

}

const mutations = {
  setTime (state, data) {
    state.time = new Date()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
