async function getUserBaseInfo () {
  this.$store.commit('setUserInfo', (await this.$https.get('/self/users/baseInfo/?t=' + new Date().getTime())).data)
}

async function logout () {
  await this.$https.delete('/self/users/login')
  this.$store.commit('logout')
  this.$router.push({ name: 'login' })
}

async function getClientList () {
  this.$store.commit('setClientList', (await this.$https.get('/self/auth/list?t=' + new Date().getTime())).data)
}

async function auth (clientId, clientState, redirectUri) {
  let newWin
  if (!(clientState && redirectUri)) {
    newWin = window.open('about:blank')
  }
  let res = await this.$https.post('/self/auth/' + clientId)
  let url = `${res.data.callBack}/?code=${res.data.code}`
  if (!newWin) {
    url += `&state=${clientState}&redirectUri=${redirectUri}`
    window.location.href = url
  } else {
    newWin.location.href = url
  }
}

async function deleteAuth (clientId) {
  await this.$https.delete('/self/auth/' + clientId)
}

export default {
  getUserBaseInfo: getUserBaseInfo,
  getClientList: getClientList,
  auth: auth,
  deleteAuth: deleteAuth,
  logout: logout
}
