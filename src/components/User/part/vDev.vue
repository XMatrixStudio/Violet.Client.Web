<template>
  <div class="comp-user-v-dev">
    <p class="control">
      <img @click="detail" class="avatar" :src="web.icon"></img>
    </p>
    <div class="info">
      <a @click="detail" class="title" target="_blank">{{web.name}}</a>
      <pre class="detail" v-html="web.detail"></pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['web'],
  computed: {
    language () {
      return this.$store.getters.language.Dev
    }
  },
  methods: {
    async detail () {
      this.$Loading.start()
      this.$router.push({ name: 'detail', query: { clientId: this.web.id } })
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
    width: 300px;
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
    }
  }
  .control {
    text-align: left;
    width: 140px;
    display: inline-block;
    vertical-align: middle;
    button {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .avatar {
    &:hover {
      transform: translateY(-6px);
    }
    cursor: pointer;
    text-align: left;
    display: inline-block;
    vertical-align: top;
    height: 80px;
    width: 80px;
    border-radius: 10px;
    margin: auto 20px;
    transition: all 0.5s;
  }
}
</style>
