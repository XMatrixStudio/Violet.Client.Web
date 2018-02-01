<template>
  <Card class="comp-user-dev" dis-hover>
    <vTitle>
      <i class="fa fa-terminal fa-fw" aria-hidden="true"></i> 开发者设置</vTitle>
    <vDev v-for="(web, index) in devList" :key="index" :web="web"></vDev>
    <p v-if="devList.length === 0">无</p>
    <div class="control">
      <Button type="success" @click="addClient">
        <i class="fa fa-plus fa-color-white fa-fw" aria-hidden="true"></i> 增加网站</Button>
    </div>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import vDev from './part/vDev'
import { mapState } from 'vuex'
export default {
  components: { vTitle, vDev },
  computed: {
    ...mapState({
      userClass: state => state.user.userClass,
      devList: state => state.user.devList
    })
  },
  async mounted () {
    await this.$service.dev.getDevList.call(this)
  },
  methods: {
    async addClient () {
      if (this.devList.length < this.userClass) {
        this.$Modal.confirm({
          title: '新增应用',
          content: `当前账号应用${this.devList.length}/${this.userClass}, 是否新增应用`,
          onOk: async () => {
            await this.$service.dev.addClient.call(this)
            await this.$service.dev.getDevList.call(this)
          },
          onCancel: () => {
          }
        })
      } else {
        this.$Modal.info({
          title: '新增失败',
          content: `应用数量已达当前账户上限${this.userClass}`
        })
      }
    }
  }
}
</script>
<style lang="scss">
.comp-user-dev {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
  .control {
    margin-top: 30px;
    position: relative;
    bottom: 0;
    .fa-color-white {
      color: #fff;
    }
  }
}
</style>

