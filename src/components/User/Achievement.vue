<template>
  <Card class="com-user-achi" dis-hover>
    <vTitle><i class="fa fa-star fa-fw" aria-hidden="true"></i> 成就列表</vTitle>
    This is {{$route.params.username}}'s Achievement component.
  </Card>
</template>

<script>
import vTitle from './vTitle'
export default {
  components: {vTitle}
}
</script>
<style lang="scss">
.com-user-achi {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
}
</style>

