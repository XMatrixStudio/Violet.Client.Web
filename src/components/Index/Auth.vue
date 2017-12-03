<template>
  <div class="violet-auth">
    <Card class="violet-auth-card">
      <p class="violet-auth-card-avatar">
        <img src="../../assets/me.jpg" alt="Avatar" />
      </p>
      <p>Hi, {{name}}</p>
      <p>是否授权登陆到{{site}}</p>
      <Button type="success" size="large">授权</Button>
      <Button type="warning" size="large">取消</Button>
    </Card>
    <p class="violet-auth-login">
      <router-link to="/">切换账号</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'ZhenlyChen',
      site: 'XMOJ'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.violet-auth-login {
  font-size: 13px;
  color: #fff;
  text-align: center;
  margin: 20px 0;
  a {
    color: yellow;
    &:hover {
      color: #ddd;
    }
  }
}
.violet-auth {
  width: 400px;
  .violet-auth-card {
    text-align: center;
    p {
      margin: 12px;
      font-size: 18px;
    }
    button {
      margin: 20px;
    }
    .violet-auth-card-avatar {
      margin: 30px;
      img {
        height: 100px;
        width: 100px;
        border-radius: 50px;
      }
    }
  }
}
</style>


