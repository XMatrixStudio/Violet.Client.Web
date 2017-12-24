<template>
  <Row :gutter="16" class="violet-login-box">
    <Col :xs="{ span: 22, offset: 2  }" :sm="{ span: 22, offset: 2  }" :md="{ span: 8, offset: 2 }" :lg="{ span: 8, offset: 2 }" class="violet-login-detail">
    <div class="violet-login-text">
      <p>你即将登陆到以下站点</p>
      <p class="violet-login-text-title">Violet User System</p>
      <ul>
        <li>
          <Icon type="android-done" slot="open"></Icon> 百万用户的信赖首选</li>
        <li>
          <Icon type="android-done" slot="open"></Icon> 全球领先的用户平台</li>
      </ul>
    </div>
    </Col>
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
  .violet-login-detail {
    color: #fff;
    text-align: left;
    .violet-login-text {
      margin-left: 10vw;
      margin-bottom: 40px;
      .violet-login-text-title {
        margin: 20px;
        font-weight: bold;
        font-size: 22px;
      }
      ul {
        margin-left: 40px;
      }
    }
  }
}
</style>


