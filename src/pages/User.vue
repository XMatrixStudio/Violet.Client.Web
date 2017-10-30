<template>
  <div>
    <Row>
      <Col span="4" offset="4">
      <Menu :theme="theme">
        <router-link :to="'/'+$route.params.username">
          <MenuItem name="profile">个人信息</MenuItem>
        </router-link>
        <router-link :to="'/'+$route.params.username+'/website'">
          <MenuItem name="website">授权网站</MenuItem>
        </router-link>
        <router-link :to="'/'+$route.params.username+'/achievement'">
          <MenuItem name="achievement">成就列表</MenuItem>
        </router-link>
      </Menu>
      </Col>
      <Col span="12" offset="2">
      <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light'
    }
  }
}
</script>
