<template>
  <div class="comp-auth">
    <div class="banner">
      <img src="../../../assets/icytown.png" />
      <Icon class="icon-check" type="ios-checkmark-circle" />
      <img src="../../../assets/icon.svg" />
      <div class="my-line"></div>
    </div>
    <p class="help-text">
      授权
      <Poptip trigger="hover" title="Icytown" content="">
        <div slot="content">
          <p>Icytown博客评论系统</p>
          <p>By
            <a href="github.com/MegaShow" target="_blank">MegaShow</a>
          </p>
          <a href="https://icytown.com" target="_blank">https://icytown.com</a>
        </div>
        <strong>Icytown</strong>
      </Poptip>
      访问你的信息
    </p>
    <Card class="auth-card">
      <div class="info">
        <img class="avatar" src="../../../assets/avatar.jpg" />
        <p>ZhenlyChen</p>
      </div>
      <div class="client">
        <p>您将授予
          <Poptip trigger="hover" title="Icytown" content="">
            <div slot="content">
              <p>Icytown博客评论系统</p>
              <p>By
                <a href="github.com/MegaShow" target="_blank">MegaShow</a>
              </p>
              <a href="https://icytown.com" target="_blank">https://icytown.com</a>
            </div>
            <strong>Icytown</strong>
          </Poptip>
          以下权限：
        </p>
        <CheckboxGroup v-model="power">
          <Checkbox label="base" disabled>
            <span>获取您的昵称、头像、性别</span>
          </Checkbox>
          <Checkbox label="info">
            <span>获取您的公开个人信息</span>
          </Checkbox>
          <Checkbox label="message">
            <span>向您发送通知</span>
          </Checkbox>
        </CheckboxGroup>
      </div>
      <Button class="auth-btn" type="info" long>授权</Button>
      <Button type="text" long @click="logout">切换账号</Button>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      power: ['base', 'info', 'message']
    }
  },
  methods: {
    logout () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss">
.comp-auth {
  .my-line {
    position: relative;
    top: -30px;
    width: 100px;
    margin: auto;
    z-index: -1;
    border-bottom: 2px dashed rgba(184, 196, 199, 0.26);
  }

  .banner {
    img {
      width: 50px;
      height: 50px;
    }

    .icon-check {
      font-size: 30px;
      color: rgb(51, 168, 73);
      vertical-align: top;
      margin: 10px 40px;
    }
  }

  .help-text {
    margin-top: 20px;
    font-size: 18px;
  }

  .auth-card {
    border-top: 3px solid rgb(0, 132, 255);
    &:hover {
      border-top: 3px solid rgb(0, 132, 255) !important;
    }
    margin: auto;
    width: 400px;
    margin-top: 50px;
    padding: 20px;
    .info {
      transform: translateY(-70px);
      font-size: 20px;
      .avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        border: 3px solid rgba(0, 132, 255, 0.425);
      }
    }
    .client {
      margin-top: -55px;
      font-size: 17px;
      .ivu-checkbox-group-item {
        text-align: left;
        display: block;
        font-size: 15px;
        margin: 20px 50px;
      }
    }
    .auth-btn {
      margin-top: 10px;
      font-weight: bold;
      width: 80%;
      font-size: 15px;
    }
  }
}
</style>
