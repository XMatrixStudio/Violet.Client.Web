<template>
  <div class="comp-user-authcatd">
    <img class="avatar" :src="web.icon"></img>
    <div class="info">
      <a :href="web.url" class="title" target="_blank">{{web.name}}</a>
      <p class="detail">{{language.lastLogin}}：{{lastTIme}}</p>
    </div>
    <div class="control">
      <i @click="deleteAuth" class="fa fa-ban" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['web'],
  computed: {
    language () {
      return this.$store.getters.language.AuthList
    },
    lastTIme () {
      return this.$util.formatDate(new Date(this.web.time), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    async deleteAuth () {
      this.$Modal.confirm({
        title: this.language.confirmTitle,
        content: `<p>${this.language.confirm}</p><p><b>${this.web.name}</b></p>`,
        okText: this.language.sure,
        cancelText: this.language.cancel,
        onOk: async () => {
          try {
            await this.$service.user.deleteAuth.call(this, this.web.id)
            await this.$service.user.getAuthList.call(this)
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  .info {
    flex-shrink: 0;
    display: inline-block;
    vertical-align: middle;
    .title {
      font-size: 20px;
      &:hover {
        text-decoration-line: underline;
      }
    }
    .detail {
      font-size: 16px;
      color: gray;
    }
  }
  .control {
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    font-size: 40px;
    cursor: pointer;
    i{
      transition: all .3s;
      &:hover{
        color: rgb(199, 33, 33);
      }
    }
  }
  .avatar {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    height: 70px;
    width: 70px;
    border-radius: 10px;
    margin: auto 20px;
    transition: all 0.3s;
  }
}
</style>
