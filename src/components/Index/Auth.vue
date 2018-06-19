<template>
  <div class="violet-auth">
    <Card class="violet-auth-card">
      <p class="violet-auth-card-avatar">
        <img :src="avatar" alt="Avatar" />
      </p>
      <p>{{language.Hi}}, {{userName}}</p>
      <p>{{language.confirm}} {{clientName}}</p>
      <Button type="success" size="large" @click="authClient">{{language.auth}}</Button>
      <Button type="warning" size="large">{{language.cancel}}</Button>
    </Card>
    <p class="violet-auth-login">
      <a @click="logout">{{language.change}}</a>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userName: state => state.user.name,
      clientName: state => state.client.name,
      clientId: state => state.client.id,
      clientState: state => state.client.state,
      redirectUrl: state => state.client.redirectUrl,
      avatar: state => state.user.info.avatar
    }),
    language() {
      return this.$store.getters.language.Auth
    }
  },
  methods: {
    async logout () {
      try {
        await this.$service.user.logout.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async getAuthState () {
      try {
        if ((await this.$service.user.getAuthState.call(this, this.clientId)).auth) {
          this.authClient()
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async authClient () {
      if (this.clientId) {
        try {
          this.$service.user.auth.call(this, this.clientId, this.clientState, this.redirectUrl)
        } catch (error) {
          this.$service.errorHandle.call(this, error)
        }
      } else {
        this.$router.push({ path: '/' + this.userName + '/' }) // 跳转到用户中心
      }
    }
  },
  mounted () {
    if (this.$store.state.user.logged) {
      // 自动授权
      if (this.clientId) {
        // this.getAuthState() // 获取授权状态
        // } else if (this.$store.state.client.redirectUrl) { // 暂时不可控，潜在bug
        //   this.$router.push({ path: this.$store.state.client.redirectUrl })
      } else {
        this.$router.push({ path: `/${this.userName}/` }) // 跳转到用户中心
      }
    } else {
      this.$router.push({ name: 'login' })
    }
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


