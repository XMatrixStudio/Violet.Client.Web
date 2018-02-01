async function getDevList () {
  this.$store.commit('setDevList', (await this.$https.get('/self/client/list?t=' + new Date().getTime())).data)
}

async function addClient (name, url, detail) {
  await this.$https.post('/self/client/')
}

async function deleteClient (id) {
  await this.$https.delete(`/self/client/${id}`)
}

async function setClient (id, data) {
  await this.$https.patch(`/self/client/${id}`, data)
}

async function changeKey (id) {
  await this.$https.put(`/self/client/key/${id}`)
}

async function getClient (id) {
  let res = await this.$https.get(`/self/client/${id}`)
  return res
}

async function setIcon (id, icon) {
  await this.$https.put(`/self/client/icon/${id}`, {
    icon: icon
  })
}

export default {
  getDevList: getDevList,
  getClient: getClient,
  addClient: addClient,
  changeKey: changeKey,
  deleteClient: deleteClient,
  setClient: setClient,
  setIcon: setIcon
}
