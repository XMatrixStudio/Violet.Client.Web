<template>
  <div>
    <Row>
      <Col span="4" offset="4">
      <Menu :theme="theme" @on-select="goTo">
        <MenuItem name="">个人信息</MenuItem>
        <MenuItem name="website">授权网站</MenuItem>
        <MenuItem name="achievement">成就列表</MenuItem>
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
  data () {
    return {
      theme: 'light'
    }
  },
  methods: {
    goTo: function (name) {
      this.$router.push({ path: '/' + this.$route.params.username + '/' + name })
    }
  }
}
</script>
