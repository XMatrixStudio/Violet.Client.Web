<template>
  <div class="comp-register">
    <Card class="register-card">
      <Icon class="btn-back" type="md-arrow-round-back" @click="gotoLogin" />
      <div class="title">
        <p class="card-title">{{helpText.title}}</p>
        <div class="line"></div>
      </div>
      <div class="reg-type">
        <ButtonGroup shape="circle">
          <Button @click="changeType(0)" :type="registerType === 0 ? 'primary' : 'default'">
            邮箱注册
          </Button>
          <Button @click="changeType(1)" :type="registerType === 1 ? 'primary' : 'default'">
            手机注册
          </Button>
        </ButtonGroup>
      </div>
      <Modal class-name="vertical-center-modal" :title="registerType === 0 ? '发送邮件' : '发送短信'" v-model="sendCodeModel" width="400px">
        <Form  ref="formItemMail" :model="formItemMail" :rules="ruleInline">
          <FormItem prop="code">
            <img class="img-code" src="../../../assets/code.png" />
            <i-input class="input-box img-code-input" type="text" v-model="formItemCode.code" placeholder="验证码">
              <Icon type="ios-ribbon" slot="prepend" />
            </i-input>
          </FormItem>
        </Form>
      </Modal>
      <Form v-show="registerType === 0" class="register-form" ref="formItemMail" :model="formItemMail" :rules="ruleInline">
        <FormItem prop="mail">
          <i-input class="input-box" type="text" v-model="formItemMail.mail" placeholder="邮箱">
            <Icon type="md-mail" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="vCode">
          <Button class="v-code-btn" type="success" @click="showCodeModel">发送邮件</Button>
          <i-input class="input-box v-code-input" type="text" v-model="formItemMail.vCode" placeholder="验证码">
            <Icon type="ios-ribbon" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="name">
          <i-input class="input-box" type="text" v-model="formItemMail.name" placeholder="用户名">
            <Icon type="md-person" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input class="input-box" type="password" v-model="formItemMail.password" placeholder="密码">
            <Icon type="md-key" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem>
          <Button class="long-button" type="info" @click="handleSubmit('formItemMail')" long>注册</Button>
        </FormItem>
      </Form>
      <Form v-show="registerType === 1" class="register-form" ref="formItemPhone" :model="formItemPhone" :rules="ruleInline">
        <FormItem prop="phone">
          <i-input class="input-box" type="text" v-model="formItemPhone.phone" placeholder="手机号">
            <Icon type="md-phone-portrait" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="vCode">
          <Button class="v-code-btn" type="success" @click="showCodeModel">发送短信</Button>
          <i-input class="input-box v-code-input" type="text" v-model="formItemMail.vCode" placeholder="验证码">
            <Icon type="ios-ribbon" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="name">
          <i-input class="input-box" type="text" v-model="formItemPhone.name" placeholder="用户名">
            <Icon type="md-person" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input class="input-box" type="password" v-model="formItemPhone.password" placeholder="密码">
            <Icon type="md-key" slot="prepend" />
          </i-input>
        </FormItem>
        <FormItem>
          <Button class="long-button" type="info" @click="handleSubmit('formItemPhone')" long>注册</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sendCodeModel: false,
      registerType: 0,
      helpText: {
        title: 'Register'
      },
      formItemPhone: {
        phone: '',
        password: '',
        vCode: '',
        name: ''
      },
      formItemMail: {
        mail: '',
        password: '',
        vCode: '',
        name: ''
      },
      formItemCode: {
        code: ''
      },
      ruleInline: {
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'string', len: 11,  message: '仅支持中国大陆号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 128,  message: '请输入6位以上的密码', trigger: 'blur' }
        ],
        vCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { type: 'string', len: 6,  message: '请输入有效的验证码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'string', min:3, max: 16, message: '请输入3-16位的用户名', trigger: 'blur' }
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

    changeType (type) {
      this.registerType = type
      this.$refs.formItemPhone.resetFields()
      this.$refs.formItemMail.resetFields()
    },

    gotoLogin () {
      this.$router.push({ name: 'login' })
    },

    showCodeModel () {
       this.sendCodeModel = true
       this.formItemCode.code = ''
    }
  }
}
</script>


<style lang="scss">
.comp-register {
  padding-top: 5vh;
  margin: 10px;
  .register-card {
    width: 400px;
    margin: auto;
    .reg-type {
      margin-top: 20px;
    }
    .btn-back {
      position: absolute;
      top: 40px;
      left: 20px;
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

    .register-form {
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
