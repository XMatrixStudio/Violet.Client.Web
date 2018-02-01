<template>
  <div>
    <Card class="violet-login-card">
      <p class="violet-login-card-title">{{language.login}}</p>
      <Form ref="loginForm" :model="loginForm" :rules="ruleItem">
        <FormItem prop="user">
          <Input type="text" v-model="loginForm.user" :placeholder="language.userHelp">
          <span slot="prepend">
            <i class="fa fa-user" aria-hidden="true"></i>
          </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginForm.password" :placeholder="language.passHelp">
          <span slot="prepend">
            <i class="fa fa-key" aria-hidden="true"></i>
          </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('loginForm')" long> {{language.login}} </Button>
        </FormItem>
        <FormItem :label="language.auto">
          <i-switch v-model="remember">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-switch>
          <router-link class="violet-login-reset" to="/reset">{{language.forget}}</router-link>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-login-signin">
      {{language.noAccount}}
      <router-link to="/register">{{language.register}}</router-link>
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
          { required: true, message: '', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '', trigger: 'blur' }
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
    },
    language () {
      return this.$store.getters.language.Login
    }
  },
  methods: {
    setLanguage() {
      this.ruleItem.user.message = this.language.nullUser
      this.ruleItem.password.message = this.language.nullPass
    },
    async login () {
      try {
        let res = await this.$service.user.login.call(this, this.$qs.stringify({
          userName: this.loginForm.user,
          userPass: this.$util.hash(this.loginForm.password),
          remember: this.remember
        }))
        if (res.valid) {
          this.$router.push({ name: 'auth' })
        } else {
          this.$router.push({ name: 'verify' })
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$Notice.error({
            title: this.language.error
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
    this.setLanguage()
    if (this.$store.state.user.logged) {
      try {
        await this.$service.user.getLoginState.call(this)
        this.$store.state.user.logged = true
        if (this.$store.state.user.valid) {
          this.$router.push({ name: 'auth' })
        } else {
          this.$router.push({ name: 'verify' })
        }
      } catch (error) {
        this.$store.state.user.logged = false
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


