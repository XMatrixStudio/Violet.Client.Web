<template>
  <div>
    <Card class="violet-login-card">
      <p class="violet-login-card-title">Login</p>
      <Form ref="loginForm" :model="loginForm" :rules="ruleItem">
        <FormItem prop="user">
          <Input type="text" v-model="loginForm.user" placeholder="用户名 / 邮箱">
          <span slot="prepend">
            <i class="fa fa-user" aria-hidden="true"></i>
          </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" placeholder="密码">
          <span slot="prepend">
            <i class="fa fa-key" aria-hidden="true"></i>
          </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('loginForm')" long>登陆</Button>
        </FormItem>
        <FormItem label="记住登陆状态">
          <i-switch v-model="remember">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-switch>
          <router-link class="violet-login-reset" to="/reset">忘记密码？</router-link>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-login-signin">
      还没有账号？
      <router-link to="/register">注册一个</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        user: '',
        password: ''
      },
      ruleItem: {
        user: [
          { required: true, message: '请填写用户名或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    remember: {
      get () {
        return this.$store.state.user.autoLogin
      },
      set (value) {
        this.$store.commit('setAuto', value)
      }
    }
  },
  methods: {
    async login () {
      try {
        let res = await this.$https.post('/self/users/login', this.$qs.stringify({
          userName: this.loginForm.user,
          userPass: this.$crypto.hash(this.loginForm.password),
          remember: this.remember
        }))
        this.$store.commit('login', res.data)
        if (res.data.valid) {
          this.$router.push({ name: 'auth' })
        } else {
          this.$router.push({ name: 'verify' })
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$Notice.error({
            title: '登陆失败',
            desc: '用户名或密码错误，请重新输入'
          })
          this.loginForm.password = ''
        })
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    }
  },
  async mounted () {
    if (this.$store.state.user.logged) {
      try {
        await this.$https.get('/self/users/login')
        if (this.$store.state.user.valid) {
          this.$router.push({ name: 'auth' })
        } else {
          this.$router.push({ name: 'verify' })
        }
      } catch (error) {
        // 没有自动登陆
      }
    }
  }
}
</script>

<style lang="scss">
.violet-login-card {
  width: 400px;
  padding: 30px;
  padding-bottom: 0;
  .violet-login-card-title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }
  p {
    text-align: right;
    font-size: 13px;
  }
}
.violet-login-reset {
  float: right;
}
.violet-login-signin {
  text-align: center;
  font-size: 13px;
  color: #fff;
  a {
    color: yellow;
    &:hover {
      color: #ddd;
    }
  }
  width: 400px;
  margin-top: 10px;
}
</style>


