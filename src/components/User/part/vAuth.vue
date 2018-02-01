<template>
  <div class="comp-user-authcatd">
    <Avatar class="avatar" :src="web.icon"></Avatar>
    <div class="info">
      <a :href="web.url" class="title" target="_blank">{{web.name}}</a>
      <p class="detail">{{web.detail}}</p>
      <!-- <p>上次登录: 2018-1-22 23:22</p> -->
    </div>
    <p class="control">
      <Button type="info" @click="auth">授权登陆</Button>
      <Button type="warning" @click="toggleShow">取消授权</Button>
    </p>
    <Modal v-model="modalAuth" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>取消授权</span>
      </p>
      <div style="text-align:center">
        <p>是否取消对 {{web.name}} 的授权？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteAuth">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ['web'],
  data () {
    return {
      modalAuth: false
    }
  },
  methods: {
    toggleShow () {
      this.modalAuth = true
    },
    async auth () {
      try {
        await this.$service.user.auth.call(this, this.web.id)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async deleteAuth () {
      this.modalAuth = false
      try {
        await this.$service.user.deleteAuth.call(this, this.web.id)
        await this.$service.user.getClientList.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async goToWebsite () {
      window.location.href = this.web.home
    }
  }
}
</script>


<style lang="scss">
.comp-user-authcatd {
  display: block;
  max-width: 800px;
  border-bottom: 1px solid #e9eaec;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .info {
    display: inline-block;
    vertical-align: middle;
    width: 50%;
    .title {
      font-size: 20px;
      &:hover {
        text-decoration-line: underline;
      }
    }
    .detail {
      font-size: 16px;
    }
  }
  .control {
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    button {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .avatar {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    height: 60px;
    width: 60px;
    margin-right: 10px;
  }
}
</style>
