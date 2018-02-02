<template>
  <div class="violet-reset">
    <Card class="violet-reset-card">
      <p class="violet-reset-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>{{language.title}}</p>
      <Form class="violet-reset-card-form" ref="resetForm" :model="resetForm" :rules="ruleCustom" :label-width="80">
        <FormItem :label="formLanguage.email" prop="email">
          <Input type="text" v-model="resetForm.email" number></Input>
        </FormItem>
        <FormItem :label="formLanguage.emailCode" prop="emailCode">
          <Input type="text" v-model="resetForm.emailCode" class="violet-reset-card-form-vCode"></Input>
          <Button type="primary" class="violet-reset-card-form-get-code" @click="getEmailCode" :disabled='myTimer !== false'>{{emailBtnText}}</Button>
        </FormItem>
        <FormItem :label="formLanguage.password" prop="password">
          <Input type="password" v-model="resetForm.password"></Input>
        </FormItem>
        <FormItem :label="formLanguage.passwordCheck" prop="passwordCheck">
          <Input type="password" v-model="resetForm.passwordCheck"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('resetForm')" class="violet-reset-card-form-button">{{language.button}}</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-reset-login">{{language.remember}}
      <router-link to="/">{{language.login}}</router-link>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.formLanguage.nullPass))
      } else {
        if (value.length < 6) {
          callback(new Error(this.formLanguage.lessPass))
        }
        if (value.length > 128) {
          callback(new Error(this.formLanguage.largePass))
        }
        if (/^[0-9]*$/.test(value)) {
          callback(new Error(this.formLanguage.invalidPass))
        }
        if (this.resetForm.passwordCheck !== '') {
          this.$refs.resetForm.validateField('passwordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.formLanguage.againPass))
      } else if (value !== this.resetForm.password) {
        callback(new Error(this.formLanguage.errorPass))
      } else {
        callback()
      }
    }
    const validateemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.formLanguage.nullEmail))
      }
      if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)) {
        callback(new Error(this.formLanguage.invalidEmail))
      } else {
        callback()
      }
    }
    const validatevCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.formLanguage.nullVCode))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        password: '',
        passwordCheck: '',
        email: '',
        emailCode: ''
      },
      emailBtnText: '',
      myTimer: false,
      ruleCustom: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwordCheck: [
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
  computed: {
    language () {
      return this.$store.getters.language.Reset
    },
    formLanguage () {
      return this.$store.getters.language.Form
    },
    ...mapState({
      emailTime: state => state.user.emailTime
    })
  },
  methods: {
    setLanguage() {
      this.emailBtnText = this.formLanguage.getVCode
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.resetPass()
        }
      })
    },
    async resetPass () {
      try {
        await this.$service.user.resetPass.call(this, this.$qs.stringify({
          email: this.resetForm.email,
          vCode: this.resetForm.emailCode,
          password: this.$util.hash(this.resetForm.password)
        }))
        this.$Notice.success({
          title: this.language.success
        })
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          let content = ''
          switch (message) {
            case 'invalid_email':
              content = this.formLanguage.noExistEmail
              break
            case 'invalid_password':
              content = this.formLanguage.invalidPassword
              break
            case 'timeout_emailCode':
              content = this.formLanguage.timeoutEmailCode
              break
            case 'error_emailCode':
              content = this.formLanguage.errorEmailCode
              break
            default:
              content = this.formLanguage.otherError + message
          }
          this.$Notice.error({
            title: this.language.fail,
            desc: content
          })
        })
      }
    },
    setTimeBtn () {
      if (this.emailTime === false || (new Date()).getTime() - (new Date(this.emailTime)).getTime() >= 60 * 1000) {
        this.emailBtnText = this.formLanguage.getVCode
        this.myTimer = false
      } else {
        this.emailBtnText = this.formLanguage.againGetVCode + '(' + Math.ceil((90 * 1000 - (new Date()).getTime() + (new Date(this.emailTime)).getTime()) / 1000) + 's)'
        this.myTimer = setTimeout(this.setTimeBtn, 1000)
      }
    },
    async getEmailCode () {
      try {
        if (!this.resetForm.email) throw (new Error(this.formLanguage.nullEmail))
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.resetForm.email)) throw (new Error('请输入有效的邮箱'))
        await this.$service.util.getEmailCode.call(this, this.resetForm.email)
        this.$Notice.success({
          title: this.formLanguage.sentEmailCode,
          desc: this.resetForm.email
        })
        clearTimeout(this.myTimer)
        this.setTimeBtn()
      } catch (error) {
        if (error.response && error.response.status === 400) {
          let content = ''
          switch (error.response.data) {
            case 'invalid_email':
              content = this.formLanguage.noExistEmail
              break
            case 'limit_time':
              content = this.formLanguage.limitTime
              break
            default:
              content = this.formLanguage.otherError + error.response.data
          }
          this.$Notice.error({
            title: this.formLanguage.failVCode,
            desc: content
          })
        } else {
          this.$Notice.error({
            title: this.formLanguage.failVCode,
            desc: error.message
          })
        }
      }
    }
  },
  mounted () {
    this.setLanguage()
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


