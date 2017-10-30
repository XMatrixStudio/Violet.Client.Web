<template>
  <div>
    <Card class="violet-login-card">
      <p class="violet-login-card-title">Login</p>
      <Form ref="formItem" :model="formItem" :rules="ruleItem">
        <FormItem prop="user">
          <Input type="text" v-model="formItem.user" placeholder="用户名 / 邮箱">
          <span slot="prepend">
            <i class="fa fa-user" aria-hidden="true"></i>
          </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formItem.password" placeholder="密码">
          <span slot="prepend">
            <i class="fa fa-key" aria-hidden="true"></i>
          </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formItem')">登陆</Button>
        </FormItem>
      </Form>
      <p>
        <router-link to="/reset">忘记密码？</router-link>
      </p>
    </Card>
    <p class="violet-login-signin">
      还没有账号？
      <router-link to="/register">注册一个</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItem: {
        user: '',
        password: ''
      },
      ruleItem: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('登陆成功!')
          this.$router.push({ path: '/verify' })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.violet-login-card {
  width: 400px;
  padding: 30px;
  .violet-login-card-title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }
  p {
    text-align: right;
    font-size: 13px;
  }
  button {
    width: 100%;
  }
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


