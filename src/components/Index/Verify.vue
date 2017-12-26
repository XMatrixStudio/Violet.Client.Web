<template>
  <div class="violet-verify">
    <Card class="violet-verify-card">
      <p class="violet-verify-card-title">
        <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>认证你的邮箱</p>
      <p class="violet-verify-card-title">{{email}}</p>
      <Form class="violet-verify-card-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="邮箱验证码" prop="emailCode">
          <Input type="text" v-model="formCustom.emailCode" class="violet-verify-card-form-vCode"></Input>
          <Button type="primary" class="violet-verify-card-form-get-code">获取验证码</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" class="violet-verify-card-form-button">认证邮箱</Button>
        </FormItem>
      </Form>
    </Card>
    <p class="violet-verify-login">
      <router-link to="/">切换账号</router-link>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    const validatevCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      formCustom: {
        emailCode: ''
      },
      ruleCustom: {
        emailCode: [
          { validator: validatevCode, trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState({
    email: state => state.user.email
  }),
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
  },
  mounted () {
    if (!this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
      this.$Notice.warning({
        title: '请先登陆'
      })
    }
  }
}
</script>

<style lang="scss">
.violet-verify-login {
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
.violet-verify {
  width: 400px;
  .violet-verify-card {
    .violet-verify-card-title {
      text-align: center;
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 40px;
      i {
        margin-right: 10px;
      }
    }
    .violet-verify-card-form {
      margin: 10px;
      .violet-verify-card-form-vCode {
        width: 150px;
      }
      .violet-verify-card-form-button {
        width: 80%;
      }
      .violet-verify-card-form-get-code {
        width: 90px;
        margin-left: 10px;
      }
    }
  }
}
</style>


