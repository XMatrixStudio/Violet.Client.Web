<template>
  <Card class="comp-user-detail" dis-hover>
    <vTitle>
      <i class="fa fa-info fa-fw" aria-hidden="true"></i> 应用详情</vTitle>
      <div class="left-box"></div>
      <div class="right-box"></div>
  </Card>
</template>

<script>
import vTitle from './vTitle'
import { mapState } from 'vuex'
export default {
  components: { vTitle },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      webList: state => state.user.webList
    })
  },
  async mounted () {
    if (this.$route.query && this.$route.query.clientId) {
    } else {
      this.$router.push({name: 'dev'})
      this.$Notice.warning({
        title: '参数错误'
      })
    }
  }
}
</script>

<style lang="scss">
.comp-user-detail {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
}
</style>
