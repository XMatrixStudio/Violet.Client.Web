<template>
  <Card class="comp-user-dev" dis-hover>
    <vTitle>
      <i class="fa fa-terminal fa-fw" aria-hidden="true"></i> {{language.title}}
      <span class="client-num">( {{this.devList.length}} / {{this.userClass}} )</span>
    </vTitle>
    <vDev v-for="(web, index) in devList" :key="index" :web="web"></vDev>
    <p v-if="devList.length === 0">{{language.none}}</p>
    <div class="control">
      <Button type="success" @click="addClient">
        <i class="fa fa-plus fa-color-white fa-fw" aria-hidden="true"></i> {{language.add}}</Button>
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
    language () {
      return this.$store.getters.language.Dev
    },
    ...mapState({
      userClass: state => state.user.userClass,
      devList: state => state.user.devList
    })
  },
  async mounted () {
    await this.$service.dev.getDevList.call(this)
    this.$Loading.finish()
  },
  methods: {
    async addClient () {
      if (this.devList.length < this.userClass) {
        this.$Modal.confirm({
          title: this.language.add,
          content: `${this.language.content}: ${this.devList.length}/${this.userClass}, ${this.language.content2}`,
          okText: this.language.sure,
          cancelText: this.language.cancel,
          onOk: async () => {
            await this.$service.dev.addClient.call(this)
            await this.$service.dev.getDevList.call(this)
          },
          onCancel: () => {
          }
        })
      } else {
        this.$Modal.info({
          okText: this.language.sure,
          title: this.language.fail,
          content: `${this.language.failContent}: ${this.userClass}`
        })
      }
    }
  }
}
</script>
<style lang="scss">
.comp-user-dev {
  padding: 20px;
  .client-num {
    font-size: 20px;
  }
  .fa-color-white {
    color: #fff;
  }
  > .control {
    margin-top: 30px;
    position: relative;
    bottom: 0;
  }
}
</style>

