<template>
  <div class="pages-user">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col :class="{'hide-text-col' : colLeft < 4, 'show-col' : colLeft >= 4}" :span="colLeft">
      <Menu class="side-bar" :theme="theme" @on-select="goTo" :active-name="actionMenu" width="auto" :open-names="['user-data']">
        <div class="user-avatar">
          <img @click="setUserInfo" class="hide-elm" :src="avatar" alt="Avatar" />
        </div>
        <div class="user-name hide-elm">{{userName}}
          <i v-if="gender === 2" class="fa fa-venus i-pink" aria-hidden="true"></i>
          <i v-if="gender === 1" class="fa fa-mars i-blue" aria-hidden="true"></i>
          <i v-if="gender === 0" class="fa fa-transgender i-other" aria-hidden="true"></i>
        </div>
        <Submenu name="user-data">
          <template slot="title">
            <i class="fa fa-user-o fa-fw" aria-hidden="true"></i>
            <span class="menu-text">个人信息</span>
          </template>
          <MenuItem class="sub-menu" name=""><i class="fa fa-info fa-fw" aria-hidden="true"></i><span class="menu-text"> 个人详情</span></MenuItem>
          <MenuItem class="sub-menu" name="setting"><i class="fa fa-info fa-fw" aria-hidden="true"></i><span class="menu-text">用户设置</span></MenuItem>
          <MenuItem class="sub-menu" name="account"><i class="fa fa-info fa-fw" aria-hidden="true"></i><span class="menu-text">账户管理</span></MenuItem>
        </Submenu>
        <MenuItem name="website">
        <i class="fa fa-globe fa-fw" aria-hidden="true"></i>
        <span class="menu-text">授权网站</span>
        </MenuItem>
        <MenuItem name="dev">
        <i class="fa fa-cogs fa-fw" aria-hidden="true"></i>
        <span class="menu-text">开发者设置</span>
        </MenuItem>
        <MenuItem name="logout">
        <i class="fa fa-sign-out fa-fw" aria-hidden="true"></i>
        <span class="menu-text">退出登陆</span>
        </MenuItem>
        <Modal v-model="modalLogout" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>退出确认</span>
          </p>
          <div style="text-align:center">
            <p>是否退出登陆？</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long @click="logout">退出</Button>
          </div>
        </Modal>
      </Menu>
      </Col>
      <Col :span="colRight" offest="2" class="detail-col">
      <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      modalLogout: false,
      actionMenu: '',
      theme: 'light',
      name: this.$route.params.username,
      colLeft: 2,
      colRight: 19
    }
  },
  computed: mapState({
    avatar: state => state.user.avatar,
    gender: state => state.user.info.gender,
    userName: state => state.user.name
  }),
  methods: {
    goTo: function (name) {
      if (name === 'logout') {
        this.modalLogout = true
      } else {
        this.$router.push({ path: '/' + this.$route.params.username + '/' + name })
      }
    },
    async logout () {
      try {
        await this.$https.delete('/self/users/login')
        this.$store.commit('logout')
        this.$router.push({ name: 'login' })
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$Notice.error({
            title: '操作失败',
            desc: '未知错误，请联系管理员，错误参数' + error.response.data
          })
        } else {
          this.$Notice.error({
            title: '发生了奇奇怪怪的错误',
            desc: '无法连接到服务器，请稍后重试'
          })
        }
      }
    },
    async getUserInfo () {
      try {
        let res = await this.$https.get('/self/users/baseInfo')
        this.$store.commit('setUserInfo', res.data)
      } catch (error) {

      }
    },
    setUserInfo() {
      this.$router.push({name: 'InfoSet'})
    }
  },
  async mounted () {
    if (!this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
    } else {
      try {
        if (new Date() - new Date(this.$store.state.user.loginTime) > 60 * 60 * 1000) {
          await this.$https.get('/self/users/login')
        }
        this.getUserInfo()
        this.actionMenu = this.$route.path.toString().split('/')[2] || '' // 最好可以改用正则匹配
        this.colLeft = window.innerWidth < 1100 ? 2 : 4
        window.onresize = (e) => {
          this.colLeft = e.target.innerWidth < 1100 ? 2 : 4
        }
      } catch (error) {
        this.$Notice.warning({ title: '登陆已过时， 请重新登陆' })
        this.$store.commit('logout')
        this.$store.commit('setUrlInfo', { redirectUri: this.$route.path })
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss">
.pages-user {
  transition: all 0.4s;
  min-width: 600px;
  .hide-text-col {
    width: 70px;
    .menu-text {
      display: none;
    }
    .hide-elm {
      display: none;
    }
    .fa {
      font-size: 17px;
    }
  }
  .show-col {
    width: 210px;
  }
  .detail-col {
    min-width: 500px;
    max-width: 900px;
  }
  .side-bar {
    padding-bottom: 20px;
    border-right: none;
    .sub-menu {
      padding-left: 24px;
    }
    .user-avatar {
      text-align: center;
      img {
        &:hover {
          transform: rotateZ(360deg);
        }
        transition: all 0.5s;
        margin-top: 30px;
        margin-bottom: 10px;
        border-radius: 50%;
        height: 100px;
        width: 100px;
      }
    }
    .user-name {
      text-align: center;
      font-size: 20px;
      margin: 10px;
      .i-pink {
        color: #e87a90;
      }
      .i-blue {
        color: #2ea9df;
      }
      .i-other {
        color: #1b813e;
      }
    }
  }
}
</style>
