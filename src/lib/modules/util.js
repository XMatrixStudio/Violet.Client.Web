async function getVCode () {
  return (await this.$https.get('/self/util/vCode')).data
}

async function getEmailCode (email) {
  await this.$https.post('/self/util/EmailCode', this.$qs.stringify({
    email: email
  }))
  this.$store.commit('setEmailTime', new Date())
}

async function getClientInfo (id) {
  let client = await this.$https.get(`/self/util/ClientInfo/${id}`)
  this.$store.commit('setClientInfo', client.data)
}

export default {
  getVCode: getVCode,
  getEmailCode: getEmailCode,
  getClientInfo: getClientInfo
}
