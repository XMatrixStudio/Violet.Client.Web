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
          <Button type="primary" @click="handleSubmit('formItem')" long>登陆</Button>
        </FormItem>
        <FormItem label="记住登陆状态">
          <i-switch v-model="formItem.switch">
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
  data() {
    return {
      formItem: {
        switch: false,
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
          this.$router.push({ path: '/auth' })
        } else {
          this.$Notice.open({
            title: '这是通知标题',
            desc: '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
          })
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


