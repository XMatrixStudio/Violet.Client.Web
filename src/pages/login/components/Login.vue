<template>
  <div class="comp-login">
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
            <Button type="text">忘记密码？</Button>
          </i-col>
        </Row>
      </FormItem>
      <FormItem>
        <Button class="long-button" type="info" @click="handleSubmit('formItem')" long>登陆</Button>
      </FormItem>
      <FormItem>
        <Button type="text">注册</Button>
      </FormItem>
    </Form>
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
    }
  }
}
</script>


<style lang="scss">
.comp-login {
  padding-top: 5vh;
  margin: 10px;
  .title {
    display: inline;
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
    margin-left: auto;
    margin-right: auto;
    margin-top: 48px;
    width: 300px;

    .input-box {
      transform: translateX(-20px);
      .ivu-input {
        background: rgba(42, 88, 104, 0.062);
        border: none;
        border-bottom: 2px solid rgba(0, 0, 0, 0);
        border-radius: 3px;
        padding: 16px;
        &::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: #344b6ea8;
          opacity: 1; /* Firefox */
          text-align: center;
        }
        &:focus {
          border: none;
          border-radius: 0;
          border-bottom: 2px solid #6f91d6;
          box-shadow: 0 0 0 0 rgba(45, 140, 240, 0.2);
        }
      }
      // Icon
      .ivu-input-group-append,
      .ivu-input-group-prepend {
        background-color: transparent;
        border: none;
        border-radius: 0;
        font-size: 18px;
        padding-right: 20px;
      }
    }

    .ivu-form-item-error-tip {
      margin-left: 36px;
    }
  }

  .ivu-form-item-error {
    .ivu-input {
      border: none;
      border-bottom: 2px solid #ed4014 !important;
      border-radius: 0 !important;
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

  .ivu-btn-text {
    transition: all 0.2s;
    &:hover {
      background: transparent;
      border-radius: 0;
    }
    &:focus {
      box-shadow: 0 0 0 0 rgba(45, 140, 240, 0.2);
    }
  }
}
</style>
