<template>
  <div class="comp-reset-type">
    <Card class="reset-type-card">
      <Icon class="btn-back" type="md-arrow-round-back" @click="goBack" />
      <div class="title">
        <p class="card-title">{{helpText.title}}</p>
        <div class="line"></div>
      </div>
      <Form class="reset-form" ref="formItemAccount" :model="formItemAccount" :rules="ruleInline">

        <FormItem>
          <p>为你的账号 ZhenlyChen 重新设置密码</p>
        </FormItem>
        <FormItem prop="account">
          <Select v-model="resetType" @on-change="formItemAccount.account = ''">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem>
          <i-input class="input-box" type="text" v-model="formItemAccount.account" :placeholder="accounthelpText">
            <Icon type="ios-person" slot="prepend" />
          </i-input>
        </FormItem>

        <FormItem v-show="resetType !== 2" prop="code">
          <Button class="v-code-btn" type="success">发送验证码</Button>
          <i-input class="input-box  v-code-input" type="text" v-model="formItemAccount.code" placeholder="验证码">
            <Icon type="ios-ribbon" slot="prepend" />
          </i-input>
        </FormItem>

        <FormItem v-show="resetType !== 2">
          <i-input class="input-box" type="password" v-model="formItemAccount.password" placeholder="新密码">
            <Icon type="md-key" slot="prepend" />
          </i-input>
        </FormItem>

        <FormItem v-show="resetType !== 2">
          <Button class="long-button" type="info" @click="handleSubmit('formItemAccount')" long>修改密码</Button>
        </FormItem>

        <FormItem v-show="resetType === 2">
          <i-input class="textarea-box" type="textarea" v-model="formItemAccount.password" placeholder="请描述你的账号的详细信息" :rows="4">
            <Icon type="md-information" slot="prepend" />
          </i-input>
        </FormItem>

        <FormItem v-show="resetType === 2">
          <Button class="long-button" type="info" @click="handleSubmit('formItemAccount')" long>提交信息</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resetType: 0,
      helpText: {
        title: 'Verify'
      },
      typeList: [{
        value: 0,
        label: '通过邮箱zhen*******@qq.com获取验证码'
      }, {
        value: 1,
        label: '通过手机188******31获取验证码'
      }, {
        value: 2,
        label: '以上都不能用，我需要人工处理'
      }],
      formItemAccount: {
        account: '',
        code: '',
        password: ''
      },
      ruleInline: {
        account: [
          { required: true, message: '请输入邮箱 / 手机号 / 用户名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { type: 'string', len: 6, message: '请输入有效的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    accounthelpText () {
      switch (this.resetType) {
        case 0: return '请输入完整的邮箱地址'
        case 1: return '请输入完整的手机号'
        case 2: return '请输入联系邮箱，我们会有专人跟进处理'
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },

    goBack () {
      this.$router.push({ name: 'reset' })
    }
  }
}
</script>

<style lang="scss">
.comp-reset-type {
  padding-top: 5vh;
  margin: 10px;
  .reset-type-card {
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
      margin-top: 18px;
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

  .textarea-box {
    textarea {
      padding: 5px;
      border: 2px solid rgba(0, 27, 9, 0.301) !important;
      width: 85%;
      &:focus {
        border: 2px solid rgba(42, 126, 236, 0.788) !important;
      }
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
