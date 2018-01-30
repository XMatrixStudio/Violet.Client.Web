<template>
  <div class="violet-reset">
    <Card class="violet-reset-card">
      <p class="violet-reset-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>找回密码</p>
      <Form class="violet-reset-card-form" ref="resetForm" :model="resetForm" :rules="ruleCustom" :label-width="80">
        <FormItem label="邮箱" prop="email">
          <Input type="text" v-model="resetForm.email" number></Input>
        </FormItem>
        <FormItem label="邮箱验证码" prop="emailCode">
          <Input type="text" v-model="resetForm.emailCode" class="violet-reset-card-form-vCode"></Input>
          <Button type="primary" class="violet-reset-card-form-get-code" @click="getEmailCode" :disabled='myTimer !== false'>{{emailBtnText}}</Button>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="resetForm.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="resetForm.passwdCheck"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('resetForm')" class="violet-reset-card-form-button">重置密码</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-reset-login">记起来了？
      <router-link to="/">立即登陆</router-link>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        }
        if (value.length > 128) {
          callback(new Error('密码不能大于128位'))
        }
        if (/^[0-9]$/.test(value)) {
          callback(new Error('密码不允许纯数字'))
        }
        if (this.resetForm.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.resetForm.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      } else {
        callback()
      }
    }
    const validatevCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        passwd: '',
        passwdCheck: '',
        email: '',
        emailCode: ''
      },
      emailBtnText: '获取验证码',
      myTimer: false,
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { validator: validateemail, trigger: 'blur' }
        ],
        emailCode: [
          { validator: validatevCode, trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState({
    emailTime: state => state.user.emailTime
  }),
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.resetPass()
        }
      })
    },
    async resetPass () {
      try {
        await this.$https.post('/self/users/password', this.$qs.stringify({
          email: this.resetForm.email,
          vCode: this.resetForm.emailCode,
          password: this.$crypto.hash(this.resetForm.passwd)
        }))
        this.$Notice.success({
          title: '修改密码成功，请重新登陆'
        })
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          let content = ''
          switch (message) {
            case 'invalid_email':
              content = '邮箱不存在'
              break
            case 'invalid_password':
              content = '无效密码'
              break
            case 'timeout_emailCode':
              content = '邮箱验证码已失效，请重新获取'
              break
            case 'error_emailCode':
              content = '邮箱验证码错误'
              break
            default:
              content = '未知错误，请联系管理员，错误参数' + message
          }
          this.$Notice.error({
            title: '找回密码失败',
            desc: content
          })
        })
      }
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
        if (!this.resetForm.email) throw (new Error('邮箱不能为空'))
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.resetForm.email)) throw (new Error('请输入有效的邮箱'))

        await this.$https.post('/self/util/EmailCode', this.$qs.stringify({
          email: this.resetForm.email
        }))
        this.$store.commit('setEmailTime', new Date())
        this.$Notice.success({
          title: '验证码已发送到你的邮箱',
          desc: this.resetForm.email
        })
        clearTimeout(this.myTimer)
        this.setTimeBtn()
      } catch (error) {
        if (error.response && error.response.status === 400) {
          let content = ''
          switch (error.response.data) {
            case 'invalid_email':
              content = '邮箱不存在'
              break
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
    }
  },
  mounted () {
    if (this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
    } else {
      this.setTimeBtn()
    }
  }
}
</script>

<style lang="scss">
.violet-reset-login {
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
.violet-reset {
  width: 400px;
  .violet-reset-card {
    .violet-reset-card-title {
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 40px;
      i {
        margin-right: 10px;
      }
    }
    .violet-reset-card-form {
      margin: 10px;
      img {
        vertical-align: middle;
        height: 30px;
        width: 80px;
      }
      .violet-reset-card-form-vCode {
        width: 150px;
      }
      .violet-reset-card-form-button {
        width: 80%;
      }
      .violet-reset-card-form-get-code {
        width: 100px;
        margin-left: 10px;
      }
    }
  }
}
</style>


