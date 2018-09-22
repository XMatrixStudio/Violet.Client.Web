<template>
  <div class="comp-reset">
    <Card class="reset-card">
      <Icon class="btn-back" type="md-arrow-round-back" @click="gotoLogin" />
      <div class="title">
        <p class="card-title">{{helpText.title}}</p>
        <div class="line"></div>
      </div>
      <Form class="reset-form" ref="formItemAccount" :model="formItemAccount" :rules="ruleInline">
        <FormItem prop="account">
          <i-input class="input-box" type="text" v-model="formItemAccount.account" placeholder="邮箱 / 手机号 / 用户名">
            <Icon type="ios-person" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="code">
          <img class="v-code-btn" src="../../../assets/code.png"/>
          <i-input class="input-box v-code-input" type="text" v-model="formItemAccount.code" placeholder="验证码">
            <Icon type="ios-ribbon" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem>
          <Button class="long-button" type="info" @click="handleSubmit('formItemAccount')" long>找回密码</Button>
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
        title: 'Reset'
      },
      formItemAccount: {
        account: '',
        code: ''
      },
      ruleInline: {
        account: [
          { required: true, message: '请输入邮箱 / 手机号 / 用户名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { type: 'string', len: 4,  message: '请输入有效的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
          this.$router.push({ name: 'resetType'})
        } else {
          this.$Message.error('Fail!');
        }
      })
    },

    gotoLogin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>


<style lang="scss">
.comp-reset {
  padding-top: 5vh;
  margin: 10px;
  .reset-card {
    width: 400px;
    margin: auto;
    .reg-type {
      margin-top: 30px;
    }
    .btn-back {
      position: absolute;
      top: 40px;
      left: 30px;
      font-size: 23px;
      transition: all 0.2s;
      &:hover {
        color: rgba(42, 126, 236, 0.788);
      }
    }
    .title {
      display: inline-table;
      padding-top: 24px;
      &:hover {
        .line {
          width: 85px;
        }
      }
      .card-title {
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
        width: 65px;
        border-bottom: 2px solid rgba(42, 126, 236, 0.788);
        margin-top: 5px;
      }
    }

    .reset-form {
      z-index: 100;
      margin-left: auto;
      margin-right: auto;
      margin-top: 48px;
      width: 300px;

      .input-box {
        transform: translateX(-20px);
      }
    }

    .long-button {
      margin-top: 15px;
      width: 200px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.089);
    }

    .v-code-input {
      width: 200px;
    }

    .v-code-btn {
      position: absolute;
      right: 20px;
    }
  }
}

.img-code-input {
  width: 200px !important;
}

.img-code {
  position: absolute;
  right: 0;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
