<template>
  <div></div>
</template>

<script>
export default {
  async mounted () {
    if (this.$route.query && this.$route.query.clientId) {
      let query = this.$route.query
      if (query.responseType === 'code' && query.state) {
        this.$store.commit('setUrlInfo', {
          clientId: query.clientId,
          state: query.state,
          redirectUri: query.redirectUri
        })
      } else {
        this.$Notice.error({
          title: '参数错误'
        })
      }
    } else {
      this.$store.commit('setClientInfo', {
        name: 'Violet User System',
        detail: 'Violet 中央授权系统'
      })
      this.$store.commit('setUrlInfo', {clientId: false})
    }
    this.$router.push({ name: 'login' })
  }
}
</script>
