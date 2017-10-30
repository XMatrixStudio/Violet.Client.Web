<template>
  <Row :gutter="16" class="violet-login-box">
    <Col :xs="{ span: 0 }" :sm="{ span: 0 }" :md="{ span: 6, offset: 4 }" :lg="{ span: 6, offset: 4 }" class="violet-login-detail">Violet User System</Col>
    <Col :xs="{ span: 6, offset: 2 }" :sm="{ span: 6, offset: 4 }" :md="{ span: 6, offset: 0 }" :lg="{ span: 6, offset: 0 }">
    <router-view></router-view>
    </Col>
  </Row>
</template>

<script>
</script>

<style lang="scss">
.violet-login-box {
  font-size: 18px;
}

.violet-login-detail {
  color: #fff;
  text-align: left;
}
</style>


