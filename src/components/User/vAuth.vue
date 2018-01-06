<template>
  <div class="comp-user-authcatd">
    <p class="title">{{web.name}}</p>
    <p class="detail">{{web.detail}}</p>
    <p class="control">
      <Button type="info">授权登陆</Button>
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
    async deleteAuth () {
      this.modalAuth = false
    }
  }
}
</script>


<style lang="scss">
.comp-user-authcatd {
  display: block;
  max-width: 600px;
  border-bottom: 1px solid #e9eaec;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .title {
    font-size: 20px;
  }
  .detail {
    font-size: 16px;
  }
  .control {
    text-align: right;
    button {
      margin-left: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
