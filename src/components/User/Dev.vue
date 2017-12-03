<template>
  <Card class="comp-user-dev" dis-hover>
    <vTitle><i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 开发者设置</vTitle>
    This is {{$route.params.username}}'s Dev component.
  </Card>
</template>

<script>
import vTitle from './vTitle'
export default {
  components: {vTitle}
}
</script>
<style lang="scss">
.comp-user-dev {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
}
</style>

