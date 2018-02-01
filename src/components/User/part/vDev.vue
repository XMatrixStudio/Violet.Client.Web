<template>
  <div class="comp-user-v-dev">
    <Avatar class="avatar" :src="web.icon"></Avatar>
    <div class="info">
      <a :href="web.url" class="title" target="_blank">{{web.name}}</a>
      <p class="detail">{{web.detail}}</p>
    </div>
    <p class="control">
      <Button type="info" @click="detail">查看详情</Button>
    </p>
  </div>
</template>

<script>
export default {
  props: ['web'],
  methods: {
    async detail () {
      this.$router.push({name: 'detail', query: {clientId: this.web.id}})
    }
  }
}
</script>


<style lang="scss">
.comp-user-v-dev {
  display: block;
  max-width: 800px;
  border-bottom: 1px solid #e9eaec;
  padding-bottom: 10px;
  margin-bottom: 20px;
  .info {
    display: inline-block;
    vertical-align: middle;
    width: 60%;
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
    margin-right: 20px;
  }
}
</style>
