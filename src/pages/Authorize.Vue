<template>
  <div></div>
</template>

<script>
export default {
  computed: {
    language () {
      return this.$store.getters.language.Index
    }
  },
  methods: {
    gotoViolet () {
      this.$store.commit('setClientInfo', {
        name: this.language.name,
        detail: this.language.detail
      })
      this.$store.commit('setUrlInfo', { clientId: false })
      this.$router.push({ name: 'login' })
    }
  },
  async mounted () {
    if (this.$route.query && this.$route.query.clientId) {
      let query = this.$route.query
      if (query.responseType === 'code' && query.state) {
        this.$store.commit('setUrlInfo', {
          clientId: query.clientId,
          state: query.state,
          redirectUrl: query.redirectUrl
        })
        this.$router.push({ name: 'login' })
      } else {
        this.$Notice.error({
          title: this.language.invalidQuery
        })
        this.gotoViolet()
      }
    } else {
      this.gotoViolet()
    }
  }
}
</script>
