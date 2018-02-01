async function getUserBaseInfo () {
  this.$store.commit('setUserInfo', (await this.$https.get('/self/users/baseInfo/?t=' + new Date().getTime())).data)
}

async function setUserInfo (data) {
  await this.$https.patch('/self/users/baseInfo/', data)
}

async function login (data) {
  let res = await this.$https.post('/self/users/login', data)
  this.$store.commit('login', res.data)
  return res.data
}

async function logout () {
  await this.$https.delete('/self/users/login')
  this.$store.commit('logout')
  this.$router.push({ name: 'login' })
}

async function getLoginState () {
  await this.$https.get('/self/users/login')
}

async function getAuthList () {
  this.$store.commit('setClientList', (await this.$https.get('/self/auth/list?t=' + new Date().getTime())).data)
}

async function getAuthSate (id) {
  return (await this.$https.get(`/self/auth/${id}`)).data
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

async function register (data) {
  await this.$https.post('/self/users/register', data)
}

async function resetPass (data) {
  await this.$https.post('/self/users/password', data)
}

async function validEmail (code) {
  await this.$https.post('/self/users/email', this.$qs.stringify({
    vCode: code
  }))
}

export default {
  // User Info
  getUserBaseInfo: getUserBaseInfo,
  setUserInfo: setUserInfo,
  // Auth
  getAuthList: getAuthList,
  auth: auth,
  deleteAuth: deleteAuth,
  getAuthSate: getAuthSate,
  // Login
  login: login,
  logout: logout,
  getLoginState: getLoginState,
  register: register,
  resetPass: resetPass,
  validEmail: validEmail
}
