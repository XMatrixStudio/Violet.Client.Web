<template>
  <div class="violet-register">
    <Card class="violet-register-card">
      <p class="violet-register-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>{{language.title}}</p>
      <Form class="violet-register-card-form" ref="registerForm" :model="registerForm" :rules="ruleCustom" :label-width="80">
        <FormItem :label="formLanguage.email" prop="email">
          <Input type="text" v-model="registerForm.email" number></Input>
        </FormItem>
        <FormItem :label="formLanguage.userName" prop="name">
          <Input type="text" v-model="registerForm.name" number></Input>
        </FormItem>
        <FormItem :label="formLanguage.password" prop="password">
          <Input type="password" v-model="registerForm.password"></Input>
        </FormItem>
        <FormItem :label="formLanguage.passwordCheck" prop="passwordCheck">
          <Input type="password" v-model="registerForm.passwordCheck"></Input>
        </FormItem>
        <FormItem :label="formLanguage.vCode" prop="vCode">
          <Input type="text" v-model="registerForm.vCode" class="violet-register-card-form-vCode"></Input>
          <img @click="getVCode" :src="registerForm.vCodeImg" :alt="formLanguage.vCode">
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('registerForm')" class="violet-register-card-form-button">{{language.button}}</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-register-login">{{language.hadAccount}}
      <router-link to="/">{{language.login}}</router-link>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language.Register
    },
    formLanguage() {
      return this.$store.getters.language.Form
    }
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.formLanguage.nullName))
      } else {
        let reg = /^[a-zA-Z][a-zA-Z0-9_]{0,31}$/
        if (!reg.test(value)) {
          callback(new Error(this.formLanguage.invalidName))
        } else {
          callback()
        }
      }
    }
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
        if (this.registerForm.passwordCheck !== '') {
          this.$refs.registerForm.validateField('passwordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.formLanguage.againPass))
      } else if (value !== this.registerForm.password) {
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
      registerForm: {
        name: '',
        password: '',
        passwordCheck: '',
        email: '',
        vCode: '',
        vCodeImg: ''
      },
      ruleCustom: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwordCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { validator: validateemail, trigger: 'blur' }
        ],
        vCode: [
          { validator: validatevCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          try {
            await this.$service.user.register.call(this, {
              email: this.registerForm.email,
              name: this.registerForm.name,
              userPass: this.$util.hash(this.registerForm.password),
              vCode: this.registerForm.vCode.toString()
            })
            this.$Notice.success({
              title: this.language.success
            })
            this.$router.push({ name: 'login' })
          } catch (error) {
            this.$service.errorHandle.call(this, error, message => {
              this.registerForm.vCode = ''
              this.getVCode()
              let content = ''
              switch (message) {
                case 'invalid_email':
                case 'invalid_name':
                case 'invalid_password':
                  content = this.formLanguage.invalid
                  break
                case 'error_code':
                  content = this.formLanguage.errorVCode
                  break
                case 'exist_email':
                  content = this.formLanguage.existEmail
                  break
                case 'exist_name':
                  content = this.formLanguage.existName
                  break
                case 'reserved_name':
                  content = this.formLanguage.reservedName
                  break
                default:
                  content = this.formLanguage.otherError + message
              }
              this.$Notice.error({
                title: this.language.error,
                desc: content
              })
            })
          }
        }
      })
    },
    async getVCode () {
      this.registerForm.vCode = ''
      try {
        this.registerForm.vCodeImg = await this.$service.util.getVCode.call(this)
      } catch (error) {
        this.$Message.error(this.formanguage.failVCode)
      }
    }
  },
  mounted () {
    if (this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
    } else {
      this.getVCode()
    }
  }
}
</script>

<style lang="scss">
.violet-register-login {
  font-size: 13px;
  color: #fff;
  text-align: center;
  margin-top: 20px;
  a {
    color: yellow;
    &:hover {
      color: #ddd;
    }
  }
}
.violet-register {
  width: 400px;
  .violet-register-card {
    .violet-register-card-title {
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 40px;
      i {
        margin-right: 10px;
      }
    }
    .violet-register-card-form {
      margin: 10px;
      img {
        vertical-align: middle;
        height: 30px;
        width: 80px;
      }
      .violet-register-card-form-vCode {
        width: 150px;
      }
      .violet-register-card-form-button {
        width: 80%;
      }
    }
  }
}
</style>


