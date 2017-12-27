<template>
  <div class="violet-verify">
    <Card class="violet-verify-card">
      <p class="violet-verify-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>认证你的邮箱</p>
      <p class="violet-verify-card-title">{{email}}</p>
      <Form class="violet-verify-card-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="邮箱验证码" prop="emailCode">
          <Input type="text" v-model="formCustom.emailCode" class="violet-verify-card-form-vCode"></Input>
          <Button type="primary" class="violet-verify-card-form-get-code" @click="getEmailCode" :disabled='myTimer !== false'>{{emailBtnText}}</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" class="violet-verify-card-form-button">认证邮箱</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-verify-login">
      <router-link to="/">切换账号</router-link>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    const validatevCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      myTimer: false,
      emailBtnText: '获取验证码',
      formCustom: {
        emailCode: ''
      },
      ruleCustom: {
        emailCode: [
          { validator: validatevCode, trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState({
    email: state => state.user.email,
    emailTime: state => state.user.emailTime
  }),
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.verifyEmail()
        }
      })
    },
    setTimeBtn () {
      if (this.emailTime === false || (new Date()).getTime() - (new Date(this.emailTime)).getTime() >= 60 * 1000) {
        this.emailBtnText = '获取验证码'
        this.myTimer = false
      } else {
        this.emailBtnText = '重新获取(' + Math.ceil((90 * 1000 - (new Date()).getTime() + (new Date(this.emailTime)).getTime()) / 1000) + 's)'
        this.myTimer = setTimeout(this.setTimeBtn, 1000)
      }
    },
    async getEmailCode () {
      try {
        await this.$https.post('/self/util/EmailCode', this.$qs.stringify({
          email: this.email
        }))
        this.$store.commit('setEmailTime', new Date())
        this.$Notice.success({
          title: '验证码已发送到你的邮箱',
          desc: this.email
        })
        clearTimeout(this.myTimer)
        this.setTimeBtn()
      } catch (error) {
        if (error.response && error.response.status === 400) {
          let content = ''
          switch (error.response.data) {
            case 'limit_time':
              content = '你的请求太频繁了，请过一会儿再请求'
              break
            default:
              content = '未知错误，请联系管理员，错误参数' + error.response.data
          }
          this.$Notice.error({
            title: '获取验证码失败',
            desc: content
          })
        } else {
          this.$Notice.error({
            title: '获取验证码失败',
            desc: error.message
          })
        }
      }
    },
    async verifyEmail () {
      try {
        await this.$https.post('/self/users/email', this.$qs.stringify({
          vCode: this.formCustom.emailCode
        }))
        this.$Notice.success({
          title: '邮箱验证成功'
        })
        this.$router.push({name: 'auth'})
      } catch (error) {
        if (error.response && error.response.status === 400) {
          let content = ''
          switch (error.response.data) {
            case 'timeout_emailCode':
              content = '邮箱验证码已失效，请重新获取'
              break
            case 'error_emailCode':
              content = '邮箱验证码错误'
              break
            default:
              content = '未知错误，请联系管理员，错误参数' + error.response.data
          }
          this.$Notice.error({
            title: '邮箱验证失败',
            desc: content
          })
        } else {
          this.$Notice.error({
            title: '邮箱验证失败',
            desc: '连接服务器失败，请稍后重试'
          })
        }
      }
    }
  },
  mounted () {
    if (!this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
      this.$Notice.warning({
        title: '请先登陆'
      })
    } else {
      this.setTimeBtn()
    }
  }
}
</script>

<style lang="scss">
.violet-verify-login {
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
.violet-verify {
  width: 400px;
  .violet-verify-card {
    .violet-verify-card-title {
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 40px;
      i {
        margin-right: 10px;
      }
    }
    .violet-verify-card-form {
      margin: 10px;
      .violet-verify-card-form-vCode {
        width: 150px;
      }
      .violet-verify-card-form-button {
        width: 80%;
      }
      .violet-verify-card-form-get-code {
        width: 100px;
        margin-left: 10px;
      }
    }
  }
}
</style>


