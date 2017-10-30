<template>
  <Row :gutter="16" class="violet-login-box">
    <Col span="11" offset="4" class="violet-login-detail">Violet User System</Col>
    <Col span="8">
      <router-view></router-view>
    </Col>
  </Row>
</template>

<script>
</script>

<style lang="scss">
.violet-login-box {
  font-size: 18px;
  min-width: 760px;
}

.violet-login-detail {
  color: #fff;
  text-align: left;
}
</style>


