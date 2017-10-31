<template>
  <div class="violet-register">
    <Card class="violet-register-card">
      <p class="violet-register-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>找回密码</p>
      <Form class="violet-register-card-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="邮箱" prop="email">
          <Input type="text" v-model="formCustom.email" number></Input>
        </FormItem>
        <FormItem label="邮箱验证码" prop="emailCode">
          <Input type="text" v-model="formCustom.emailCode" class="violet-register-card-form-vCode"></Input>
          <Button type="primary" class="violet-register-card-form-get-code">获取验证码</Button>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" class="violet-register-card-form-button">重置密码</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-register-login">记起来了？
      <router-link to="/">立即登陆</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formCustom.passwd) {
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
      formCustom: {
        passwd: '',
        passwdCheck: '',
        email: '',
        vCode: '',
        emailCode: ''
      },
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
        vCode: [
          { validator: validatevCode, trigger: 'blur' }
        ],
        emailCode: [
          { validator: validatevCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.violet-register-login {
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
      .violet-register-card-form-vCode {
        width: 150px;
      }
      .violet-register-card-form-button {
        width: 80%;
      }
      .violet-register-card-form-get-code {
        width: 90px;
        margin-left: 10px;
      }
    }
  }
}
</style>


