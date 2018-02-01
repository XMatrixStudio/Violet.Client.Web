<template>
  <Card class="comp-user-web" dis-hover>
    <vTitle>
      <i class="fa fa-globe fa-fw" aria-hidden="true"></i> 授权网站</vTitle>
    <vAuth v-for="(web, index) in webList" :key="index" :web="web"></vAuth>
    <p v-if="webList.length === 0">无</p>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import vAuth from './part/vAuth'
import { mapState } from 'vuex'
export default {
  components: { vTitle, vAuth },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      webList: state => state.user.webList
    })
  },
  async mounted() {
    await this.$service.user.getClientList.call(this)
  }
}
</script>

<style lang="scss">
.comp-user-web {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
}
</style>
