<template>
  <Row :gutter="16" class="violet-login-box">
    <Col :xs="{ span: 22, offset: 2  }" :sm="{ span: 22, offset: 2  }" :md="{ span: 8, offset: 2 }" :lg="{ span: 8, offset: 2 }" class="violet-login-detail">
    <div class="violet-login-text">
      <p>你即将登陆到</p>
      <p class="violet-login-text-title">{{clientName}}</p>
      <ul>
        <li>
          <Icon type="android-done" slot="open"></Icon> {{clientDetail}}</li>
      </ul>
      <div class="control">
        <a :class="{'hide-text': clientId == false}" @click="setUrlInfo">不，我想登陆到Violet</a>
      </div>
    </div>
    </Col>
    <Col :xs="{ span: 6, offset: 2 }" :sm="{ span: 6, offset: 4 }" :md="{ span: 6, offset: 0 }" :lg="{ span: 6, offset: 0 }">
    <router-view></router-view>
    </Col>
  </Row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: mapState({
    clientName: state => state.client.name,
    clientDetail: state => state.client.detail,
    clientId: state => state.client.id
  }),
  methods: {
    async getClientInfo () {
      try {
        let client = await this.$https.get('/self/util/ClientInfo/' + this.clientId)
        this.$store.commit('setClientInfo', client.data)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          let content = ''
          switch (error.response.data) {
            case 'error_clientId':
              content = '无效的连接，将登陆到Violet用户系统'
              break
            default:
              content = '未知错误， 错误参数' + error.response.data
          }
          this.$Notice.error({
            title: '发生错误',
            desc: content
          })
        } else {
          this.$Notice.error({
            title: '发生错误',
            desc: '无法连接到服务器'
          })
        }
      }
    },
    setUrlInfo () {
      this.$store.commit('setClientInfo', {
        name: 'Violet User System',
        detail: 'Violet 中央授权系统'
      })
      this.$store.commit('setUrlInfo', {clientId: false})
    }
  },
  async mounted () {
    if (this.clientId) {
      await this.getClientInfo()
    }
  }
}
</script>


<style lang="scss">
.violet-login-box {
  font-size: 18px;
  margin-top: 3%;
  .violet-login-detail {
    color: #fff;
    text-align: left;
    .violet-login-text {
      margin-left: 10vw;
      margin-bottom: 40px;
      .control {
        margin-top: 60px;
        .hide-text {
          display: none;
        }
        a {
          color: #ddd;
          &:hover {
            color: #eee;
          }
        }
      }
      .violet-login-text-title {
        margin: 20px;
        font-weight: bold;
        font-size: 22px;
      }
      ul {
        margin-left: 40px;
      }
    }
  }
}
</style>


