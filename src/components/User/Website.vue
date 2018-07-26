<template>
  <Card class="comp-user-web" dis-hover>
    <vTitle>
      <i class="fa fa-globe fa-fw" aria-hidden="true"></i> {{language.title}}</vTitle>
    <vAuth v-for="(web, index) in webList" :key="index" :web="web"></vAuth>
    <p v-if="webList.length === 0">{{language.none}}</p>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import vAuth from './part/vAuth'
import { mapState } from 'vuex'
export default {
  components: { vTitle, vAuth },
  computed: {
    language() {
      return this.$store.getters.language.AuthList
    },
    ...mapState({
      webList: state => state.user.webList
    })
  },
  async mounted() {
    await this.$service.user.getAuthList.call(this)
    this.$Loading.finish()
  }
}
</script>

<style lang="scss">
.comp-user-web {
  padding: 20px;
}
</style>
