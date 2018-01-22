<template>
  <Card class="comp-user-web" dis-hover>
    <vTitle>
      <i class="fa fa-globe fa-fw" aria-hidden="true"></i> 授权网站</vTitle>
    <vAuth v-for="(web, index) in webList" :key="index" :web="web"></vAuth>
  </Card>
</template>

<script>
import vTitle from './vTitle'
import vAuth from './vAuth'
export default {
  components: { vTitle, vAuth },
  data () {
    return {
      webList: [{
        id: 'dsajfojhsadofias',
        name: 'XMatrix Online Judging',
        detail: '在线评测系统',
        url: 'https://oj.xmatrix.studio',
        avatar: 'http://violet-1252808268.cosgz.myqcloud.com/0.png'
      }, {
        id: 'jsadoifjaosdjf',
        name: 'Icy Blog',
        detail: '冰镇博客',
        url: 'https://icytown.com',
        avatar: 'http://violet-1252808268.cosgz.myqcloud.com/0.png'
      }]
    }
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
