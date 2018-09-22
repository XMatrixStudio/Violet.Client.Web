<template>
  <div class="comp-login">
    <Card class="login-card">
      <div class="title">
        <p class="login-to">{{helpText.loginTo}}</p>
        <div class="line"></div>
      </div>
      <Form class="login-form" ref="formItem" :model="formItem" :rules="ruleInline">
        <FormItem prop="user">
          <i-input class="input-box" type="text" v-model="formItem.user" placeholder="手机号 / 邮箱 / 用户名">
            <Icon type="ios-person" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input class="input-box" type="password" v-model="formItem.password" placeholder="密码">
            <Icon type="md-key" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem>
          <Row>
            <i-col class="keep-login" span="12">
              <i-switch size="small" />
              <span>保持登陆状态</span>
            </i-col>
            <i-col class="forget-pass" span="12">
              <Button type="text" @click="gotoReset">忘记密码？</Button>
            </i-col>
          </Row>
        </FormItem>
        <FormItem>
          <Button class="long-button" type="info" @click="handleSubmit('formItem')" long>登陆</Button>
        </FormItem>
        <FormItem>
          <Button type="text" @click="gotoRegister" long>注册</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      helpText: {
        loginTo: 'Login'
      },
      clientName: '用户中心',
      formItem: {
        user: '',
        password: '',
        checkbox: []
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入有效的手机号/邮箱/用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },

    gotoRegister () {
      this.$router.push({ name: 'register' })
    },

    gotoReset () {
      this.$router.push({ name: 'reset' })
    }
  }
}
</script>


<style lang="scss">
.comp-login {
  padding-top: 5vh;
  margin: 10px;

  .login-card {
    width: 400px;
    margin: auto;
  }

  .bg {
    position: fixed;
    transform: skew(0deg, -15deg);
    top: 200px;
    left: 0;
    right: 0;
    height: 200px;
    background: #5d83eb;
    z-index: 0;
  }
  .title {
    display: inline-table;
    padding-top: 24px;
    &:hover {
      .line {
        width: 65px;
      }
    }
    .login-to {
      display: inline;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 3px;
      user-select: none;
    }

    .line {
      transition: all 0.2s;
      margin-left: auto;
      margin-right: auto;
      width: 45px;
      border-bottom: 2px solid rgba(42, 126, 236, 0.788);
      margin-top: 5px;
    }
  }

  .login-form {
    z-index: 100;
    margin-left: auto;
    margin-right: auto;
    margin-top: 48px;
    width: 300px;

    .input-box {
      transform: translateX(-20px);
    }
  }

  .keep-login {
    padding-left: 28px;
    text-align: left;
    span {
      padding-left: 10px;
      vertical-align: middle;
      user-select: none;
    }
  }

  .long-button {
    width: 200px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.089);
  }

  .forget-pass {
    text-align: right;
  }

}
</style>
