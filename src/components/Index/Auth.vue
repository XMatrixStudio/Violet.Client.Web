<template>
  <div class="violet-auth">
    <Card class="violet-auth-card">
      <p class="violet-auth-card-avatar">
        <img :src="avatar" alt="Avatar" />
      </p>
      <p>Hi, {{userName}}</p>
      <p>是否授权登陆到{{clientName}}</p>
      <Button type="success" size="large" @click="authClient">授权</Button>
      <Button type="warning" size="large">取消</Button>
    </Card>
    <p class="violet-auth-login">
      <a @click="logout">切换账号</a>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: mapState({
    userName: state => state.user.nikeName,
    clientName: state => state.client.name,
    clientId: state => state.client.id,
    clientState: state => state.client.state,
    redirectUri: state => state.client.redirectUri,
    avatar: state => state.user.avatar
  }),
  methods: {
    async logout () {
      try {
        await this.$https.delete('/self/users/login')
        this.$router.push({ name: 'login' })
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$Notice.error({
            title: '操作失败',
            desc: '未知错误，请联系管理员，错误参数' + error.response.data
          })
        } else {
          this.$Notice.error({
            title: '发生了奇奇怪怪的错误',
            desc: '无法连接到服务器，请稍后重试'
          })
        }
      }
    },
    async getAuthState () {
      try {
        let res = await this.$https.get('/self/auth/' + this.clientId)
        if (res.data.auth) {
          this.authClient()
        }
      } catch (error) {
        this.$Notice.warning({
          title: '发生了一点错误',
          desc: '错误参数' + error.response.data
        })
      }
    },
    async authClient () {
      if (this.clientId) {
        try {
          let res = await this.$https.post('/self/auth/' + this.clientId)
          window.location.href = `${res.data.url}/?code=${res.data.code}&state=${this.clientState}&redirectUri=${this.redirectUri}`
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.$Notice.error({
              title: '授权失败',
              desc: '未知错误，请联系管理员，错误参数' + error.response.data
            })
          } else {
            this.$Notice.error({
              title: '授权失败',
              desc: '无法连接到服务器，请稍后重试'
            })
          }
        }
      } else {
        this.$router.push({ path: '/' + this.userName + '/' }) // 跳转到用户中心
      }
    }
  },
  mounted () {
    if (this.$store.state.user.logged) {
      // 自动授权 - 开启之后逻辑比较怪，先关闭着
      if (this.clientId) {
        // this.getAuthState() // 获取授权状态
      } else {
        this.$router.push({ path: '/' + this.userName + '/' }) // 跳转到用户中心
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


