<template>
  <div class="pages-user">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col class="side-col">
      <Menu class="side-bar" :theme="theme" @on-select="goTo">
        <div class="user-avatar">
          <img :src="avatar" alt="Avatar" />
        </div>
        <div class="user-name">{{nikeName}}
          <i v-if="sex === 2" class="fa fa-venus i-pink" aria-hidden="true"></i>
          <i v-if="sex === 1" class="fa fa-mars i-blue" aria-hidden="true"></i>
          <i v-if="sex === 0" class="fa fa-transgender i-other" aria-hidden="true"></i>
        </div>
        <MenuItem name="">
        <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> 个人信息</MenuItem>
        <MenuItem name="website">
        <i class="fa fa-globe fa-fw" aria-hidden="true"></i> 授权网站</MenuItem>
        <MenuItem name="follows">
        <i class="fa fa-users fa-fw" aria-hidden="true"></i> 关注好友</MenuItem>
        <MenuItem name="achievement">
        <i class="fa fa-star fa-fw" aria-hidden="true"></i> 成就列表</MenuItem>
        <MenuItem name="dev">
        <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 开发者设置</MenuItem>
      </Menu>
      </Col>
      <Col span="16" offest="2" class="detail-col">
      <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theme: 'light',
      avatar: '/static/me.jpg',
      sex: 1,
      nikeName: 'ZhenlyChen',
      userName: this.$route.params.username
    }
  },
  methods: {
    goTo: function (name) {
      this.$router.push({ path: '/' + this.$route.params.username + '/' + name })
    }
  }
}
</script>

<style lang="scss">
.pages-user {
  .side-col {
    min-width: 240px;
  }
  .detail-col {
    min-width: 400px;
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
