<template>
  <Row :gutter="16" class="violet-login-box">
    <Col :xs="{ span: 22, offset: 2  }" :sm="{ span: 22, offset: 2  }" :md="{ span: 8, offset: 2 }" :lg="{ span: 8, offset: 2 }" class="violet-login-detail">
    <div class="violet-login-text">
      <p>{{language.welcome}}</p>
      <p class="violet-login-text-title">{{clientName}}</p>
      <ul>
        <li>
          <Icon type="android-done" slot="open"></Icon> {{clientDetail}}</li>
      </ul>
      <div class="control">
        <a :class="{'hide-text': clientId == false}" @click="setUrlInfo">{{language.violet}}</a>
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
  computed: {
    language () {
      return this.$store.getters.language.Index
    },
    ...mapState({
      clientName: state => state.client.name,
      clientDetail: state => state.client.detail,
      clientId: state => state.client.id
    })
  },
  methods: {
    async getClientInfo () {
      try {
        this.$service.util.getClientInfo.call(this, this.clientId)
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          let content = ''
          switch (message) {
            case 'error_clientId':
              content = this.language.errorClientId
              break
            default:
              content = this.language.errorOther + message
          }
          this.$Notice.error({
            title: content
          })
        })
      }
    },
    setUrlInfo () {
      this.$store.commit('setClientInfo', {
        name: this.language.name,
        detail: this.language.detail
      })
      this.$store.commit('setUrlInfo', { clientId: false })
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


