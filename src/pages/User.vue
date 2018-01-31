<template>
  <div class="pages-user">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col class="show-col" :span="colLeft">
      <Menu ref="leftMenu" class="side-bar" :theme="theme" @on-select="goTo" :active-name="actionMenu" width="auto">
        <div class="user-avatar" :title="language.avatar">
          <img @click="toggleShow" class="hide-elm" :src="avatar" alt="Avatar" />
          <my-upload :langExt="language.upload" field="img" @crop-success="cropSuccess" v-model="show" :width="200" :height="200" img-format="jpg"></my-upload>
        </div>
        <div class="user-name hide-elm">{{userName}}
          <i v-if="gender === 2" class="fa fa-venus i-pink" aria-hidden="true"></i>
          <i v-if="gender === 1" class="fa fa-mars i-blue" aria-hidden="true"></i>
          <i v-if="gender === 0" class="fa fa-transgender i-other" aria-hidden="true"></i>
        </div>
        <MenuItem name="">
        <i class="fa fa-user-o fa-fw" aria-hidden="true"></i>
        <span class="menu-text">{{language.home}}</span>
        </MenuItem>
        <MenuItem name="infoSet">
        <i class="fa fa-sliders fa-fw" aria-hidden="true"></i>
        <span class="menu-text">{{language.setting}}</span>
        </MenuItem>
        <MenuItem name="website">
        <i class="fa fa-globe fa-fw" aria-hidden="true"></i>
        <span class="menu-text">{{language.website}}</span>
        </MenuItem>
        <MenuItem v-if="userClass !== 0" name="dev">
        <i class="fa fa-terminal fa-fw" aria-hidden="true"></i>
        <span class="menu-text">{{language.dev}}</span>
        </MenuItem>
        <MenuItem name="logout">
        <i class="fa fa-sign-out fa-fw" aria-hidden="true"></i>
        <span class="menu-text">{{language.logout}}</span>
        </MenuItem>
        <Modal v-model="modalLogout" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>{{language.modal.title}}</span>
          </p>
          <div style="text-align:center">
            <p>{{language.modal.content}}</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long @click="logout">{{language.modal.button}}</Button>
          </div>
        </Modal>
      </Menu>
      </Col>
      <Col :span="colRight" class="detail-col">
      <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    'my-upload': myUpload
  },
  data () {
    return {
      show: false,
      imgDataUrl: '',
      modalLogout: false,
      actionMenu: '',
      theme: 'light',
      name: this.$route.params.username,
      colLeft: 4,
      colRight: 17
    }
  },
  computed: {
    ...mapState({
      avatar: state => state.user.info.avatar,
      gender: state => state.user.info.gender,
      userName: state => state.user.name,
      userClass: state => state.user.userClass
    }),
    language() {
      return this.$store.getters.language.User
    }
  },
  methods: {
    goTo: function (name) {
      if (name === 'logout') {
        this.modalLogout = true
      } else {
        this.$router.push({ path: '/' + this.$route.params.username + '/' + name })
      }
    },
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
      this.uploadAvatar()
    },
    async uploadAvatar () {
      try {
        await this.$https.put('/self/users/avatar', { avatar: this.imgDataUrl })
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async logout () {
      try {
        await this.$service.user.logout.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    async getInfo () {
      try {
        // if (new Date() - new Date(this.$store.state.user.loginTime) > 60 * 60 * 1000) {
        //   await this.$https.get('/self/users/login')
        // }
        await this.$service.user.getUserBaseInfo.call(this)
        this.$refs.leftMenu.currentActiveName = this.$route.path.toString().split('/')[2] || '' // 最好可以改用正则匹配
      } catch (error) {
        console.log(error)
        this.$Notice.warning({ title: this.$store.getters.language.Notice.error.logTimeout })
        this.$store.commit('logout')
        this.$store.commit('setUrlInfo', { redirectUri: this.$route.path })
        this.$router.push({ name: 'login' })
      }
    }
  },
  async mounted () {
    if (!this.$store.state.user.logged) {
      this.$router.push({ name: 'login' })
    } else {
      this.getInfo()
    }
  }
}
</script>

<style lang="scss">
.pages-user {
  transition: all 0.4s;
  min-width: 800px;
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
    margin-left: 20px;
    min-width: 500px;
    max-width: 900px;
  }
  .side-bar {
    .ivu-menu-item-active {
      color: #1da13e !important;
      border-right: none !important;
      border-left: 2px solid #1da13e;
    }

    padding-bottom: 20px;
    border-right: none;
    .user-avatar {
      text-align: center;
      > img {
        &:hover {
          transform: translateY(-4px);
        }
        cursor: pointer;
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
