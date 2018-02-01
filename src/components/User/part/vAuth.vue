<template>
  <div class="comp-user-authcatd">
    <Avatar class="avatar" :src="web.icon"></Avatar>
    <div class="info">
      <a :href="web.url" class="title" target="_blank">{{web.name}}</a>
      <p class="detail">{{web.detail}}</p>
    </div>
    <p class="control">
      <Button type="info" @click="auth">{{language.authLogin}}</Button>
      <Button type="warning" @click="deleteAuth">{{language.cancelAuth}}</Button>
    </p>
  </div>
</template>

<script>
export default {
  props: ['web'],
  computed: {
    language () {
      return this.$store.getters.language.AuthList
    }
  },
  methods: {
    async auth () {
      try {
        await this.$service.user.auth.call(this, this.web.id)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async deleteAuth () {
      this.$Modal.confirm({
        title: this.language.confirmTitle,
        content: `<p>${this.language.confirm}</p><p><b>${this.web.name}</b></p>`,
        okText: this.language.sure,
        cancelText: this.language.cancel,
        onOk: async () => {
          try {
            await this.$service.user.deleteAuth.call(this, this.web.id)
            await this.$service.user.getClientList.call(this)
          } catch (error) {
            this.$service.errorHandle.call(this, error)
          }
        }
      })
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
