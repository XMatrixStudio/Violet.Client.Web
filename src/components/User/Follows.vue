<template>
  <Card class="comp-user-follows" dis-hover>
    <vTitle><i class="fa fa-users fa-fw" aria-hidden="true"></i> 关注好友</vTitle>
    This is {{$route.params.username}}'s Follows component.
  </Card>
</template>

<script>
import vTitle from './vTitle'
export default {
  components: {vTitle}
}
</script>
<style lang="scss">
.comp-user-follows {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
}
</style>

