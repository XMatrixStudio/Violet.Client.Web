<template>
  <div class="violet-register">
    <Card class="violet-register-card">
      <p class="violet-register-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>使用邮箱注册</p>
      <Form class="violet-register-card-form" ref="registerForm" :model="registerForm" :rules="ruleCustom" :label-width="80">
        <FormItem label="邮箱" prop="email">
          <Input type="text" v-model="registerForm.email" number></Input>
        </FormItem>
        <FormItem label="用户名" prop="name">
          <Input type="text" v-model="registerForm.name" number></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="registerForm.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="registerForm.passwdCheck"></Input>
        </FormItem>
        <FormItem label="验证码" prop="vCode">
          <Input type="text" v-model="registerForm.vCode" class="violet-register-card-form-vCode"></Input>
          <img @click="getVCode" :src="registerForm.vCodeImg" alt="验证码">
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('registerForm')" class="violet-register-card-form-button">注册</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-register-login">已有账号？
      <router-link to="/">立即登陆</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        let reg = /^[a-zA-Z][a-zA-Z0-9_]{5,18}$/
        if (!reg.test(value)) {
          callback(new Error('用户名以字母开头，包含字母数字下划线，6-18位'))
        } else {
          callback()
        }
      }
    }
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
        let regExp = /^[0-9]$/
        if (regExp.test(value)) {
          callback(new Error('密码不允许纯数字'))
        }
        if (this.registerForm.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.registerForm.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateemail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
      if (!reg.test(value)) {
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
      registerForm: {
        name: '',
        passwd: '',
        passwdCheck: '',
        email: '',
        vCode: '',
        vCodeImg: ''
      },
      ruleCustom: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
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
            await this.$https.post('/self/users/register', this.$qs.stringify({
              email: this.registerForm.email,
              name: this.registerForm.name,
              userPass: this.registerForm.passwd,
              vCode: this.registerForm.vCode
            }))
            this.$Notice.success({
              title: '注册成功'
            })
            this.$router.push({ name: 'login' })
          } catch (error) {
            if (error.response && error.response.status === 400) {
              this.registerForm.vCode = ''
              await this.getVCode()
              let content = ''
              switch (error.response.data) {
                case 'invalid_email':
                case 'invalid_name':
                case 'invalid_password':
                  content = '无法通过验证'
                  break
                case 'error_code':
                  content = '验证码错误'
                  break
                case 'exist_email':
                  content = '该邮箱已注册，请尝试登陆'
                  break
                case 'exist_name':
                  content = '该用户名已存在'
                  break
                default:
                  content = '未知错误，请联系管理员，错误参数' + error.response.data
              }
              this.$Notice.error({
                title: '注册失败',
                desc: content
              })
            } else {
              this.$Notice.error({
                title: '注册失败',
                desc: '服务器发生错误，请稍后重试'
              })
            }
          }
        }
      })
    },
    async getVCode () {
      this.registerForm.vCode = ''
      try {
        this.registerForm.vCodeImg = (await this.$https.get('/self/util/vCode')).data
      } catch (error) {
        this.$Message.error('获取验证码失败, 请稍后重试')
      }
    }
  },
  mounted () {
    if (!this.$store.state.user.logged) {
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


