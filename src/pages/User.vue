<template>
  <div class="pages-user">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col :class="{'hide-text-col' : colLeft < 4, 'show-col' : colLeft >= 4}" :span="colLeft">
      <Menu class="side-bar" :theme="theme" @on-select="goTo" :active-name="actionMenu" width="auto">
        <div class="user-avatar">
          <img class="hide-elm" :src="avatar" alt="Avatar" />
        </div>
        <div class="user-name hide-elm">{{nikeName}}
          <i v-if="sex === 2" class="fa fa-venus i-pink" aria-hidden="true"></i>
          <i v-if="sex === 1" class="fa fa-mars i-blue" aria-hidden="true"></i>
          <i v-if="sex === 0" class="fa fa-transgender i-other" aria-hidden="true"></i>
        </div>
        <MenuItem name="">
        <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> <span class="menu-text">个人信息</span> </MenuItem>
        <MenuItem name="website">
        <i class="fa fa-globe fa-fw" aria-hidden="true"></i> <span class="menu-text">授权网站</span></MenuItem>
        <MenuItem name="follows">
        <i class="fa fa-users fa-fw" aria-hidden="true"></i> <span class="menu-text">关注好友</span></MenuItem>
        <MenuItem name="achievement">
        <i class="fa fa-star fa-fw" aria-hidden="true"></i> <span class="menu-text">成就列表</span></MenuItem>
        <MenuItem name="dev">
        <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> <span class="menu-text">开发者设置</span></MenuItem>
      </Menu>
      </Col>
      <Col :span="colRight" offest="2" class="detail-col">
      <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      actionMenu: '',
      theme: 'light',
      avatar: '/static/me.jpg',
      sex: 1,
      nikeName: 'ZhenlyChen',
      userName: this.$route.params.username,
      colLeft: 2,
      colRight: 19
    }
  },
  methods: {
    goTo: function (name) {
      this.$router.push({ path: '/' + this.$route.params.username + '/' + name })
    }
  },
  mounted() {
    this.actionMenu = this.$route.path.toString().split('/')[2] || '' // 最好可以改用正则匹配
    this.colLeft = window.innerWidth < 1100 ? 2 : 4
    window.onresize = (e) => {
      this.colLeft = e.target.innerWidth < 1100 ? 2 : 4
    }
  }
}
</script>

<style lang="scss">
.pages-user {
  transition: all .4s;
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
    .user-avatar {
      text-align: center;
      img {
        &:hover {
          transform: rotateZ(360deg);
        }
        transition: all .5s;
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
      .i-pink{
        color: #E87A90;
      }
      .i-blue {
        color: #2EA9DF;
      }
      .i-other {
        color: #1B813E;
      }
    }
  }
}
</style>
