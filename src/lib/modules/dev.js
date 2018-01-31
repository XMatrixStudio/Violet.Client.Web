async function getDevList () {
  this.$store.commit('setDevList', (await this.$https.get('/self/client/list?t=' + new Date().getTime())).data)
}

async function addClient (name, url, detail) {
  await this.$https.post('/self/client/', {
    name: '新建应用',
    detail: '应用简介',
    url: 'https://oauth.xmatrix.studio'
  })
}

async function getClient (id) {
  let res = await this.$https.get(`/self/client/${id}`)
  return res.data
}

export default {
  getDevList: getDevList,
  getClient: getClient,
  addClient: addClient
}
