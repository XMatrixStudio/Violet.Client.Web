<template>
  <div class="violet-verify">
    <Card class="violet-verify-card">
      <p class="violet-verify-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>{{language.title}}</p>
      <p class="violet-verify-card-title">{{email}}</p>
      <Form class="violet-verify-card-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem :label="formLanguage.emailCode" prop="emailCode">
          <Input type="text" v-model="formCustom.emailCode" class="violet-verify-card-form-vCode"></Input>
          <Button type="primary" class="violet-verify-card-form-get-code" @click="getEmailCode" :disabled='myTimer !== false'>{{emailBtnText}}</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" class="violet-verify-card-form-button">{{language.button}}</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-verify-login">
      <a @click="logout">{{language.change}}</a>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    const validatevCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.formLanguage.nullVCode))
      } else {
        callback()
      }
    }
    return {
      myTimer: false,
      emailBtnText: '',
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
  computed: {
    language () {
      return this.$store.getters.language.Verify
    },
    formLanguage () {
      return this.$store.getters.language.Form
    },
    ...mapState({
      email: state => state.user.email,
      emailTime: state => state.user.emailTime
    })
  },
  methods: {
    setLanguage() {
      this.emailBtnText = this.formLanguage.getVCode
    },
    async logout () {
      try {
        await this.$https.delete('/self/users/login')
        this.$store.commit('logout')
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.verifyEmail()
        }
      })
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
        await this.$service.util.getEmailCode.call(this, this.email)
        this.$Notice.success({
          title: this.formLanguage.sentEmailCode,
          desc: this.email
        })
        clearTimeout(this.myTimer)
        this.setTimeBtn()
      } catch (error) {
        if (error.response && error.response.status === 400) {
          let content = ''
          switch (error.response.data) {
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
    },
    async verifyEmail () {
      try {
        await this.$service.user.validEmail.call(this, this.formCustom.emailCode)
        this.$Notice.success({
          title: this.language.success
        })
        this.$router.push({ name: 'auth' })
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          let content = ''
          switch (error.response.data) {
            case 'timeout_emailCode':
              content = this.formLanguage.timeoutEmailCode
              break
            case 'error_emailCode':
              content = this.formLanguage.errorEmailCode
              break
            default:
              content = this.formLanguage.otherError + error.response.data
          }
          this.$Notice.error({
            title: this.language.fail,
            desc: content
          })
        })
      }
    }
  },
  mounted () {
    this.setLanguage()
    if (!this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
      this.$Notice.warning({
        title: this.language.toLogin
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


