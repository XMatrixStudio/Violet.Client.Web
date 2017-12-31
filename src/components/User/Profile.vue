<template>
  <Card class="comp-user-profile" dis-hover>
    <vTitle>
      <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> 个人信息</vTitle>
    <div class="content">
      <p>
        <span>
          <i class="fa fa-address-card-o fa-fw" aria-hidden="true"></i> 用户名： </span>{{name}}</p>
      <p>
        <span>
          <i class="fa fa-at fa-fw" aria-hidden="true"></i> 邮箱： </span>{{email}}</p>
      <p v-if="info.url">
        <span>
          <i class="fa fa-home fa-fw" aria-hidden="true"></i> 个人主页：</span>{{info.url}}</p>
      <p v-if="info.phone">
        <span>
          <i class="fa fa-mobile fa-fw" aria-hidden="true"></i> 手机号码：</span>{{info.phone}}</p>
      <p v-if="info.bio">
        <span>
          <i class="fa fa-hashtag fa-fw" aria-hidden="true"></i> 个人说明：</span>{{info.bio}}</p>
      <p v-if="info.birthDate">
        <span>
          <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i> 生日： </span>{{info.birthDate}}</p>
      <p v-if="info.location">
        <span>
          <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> 居住地： </span>{{info.location}}</p>
      <p>
        <span>
          <i class="fa fa-key fa-fw" aria-hidden="true"></i> 账号类型：</span>{{userClassName}}</p>
    </div>
    <div class="control">
      <Button type="warning" @click="setUserInfo">修改个人资料</Button>
    </div>
  </Card>
</template>

<script>
import vTitle from './vTitle'
import { mapState } from 'vuex'
export default {
  components: { vTitle },
  data () {
    return {
      userName: this.$route.params.username
    }
  },
  methods: {
    setUserInfo () {
      this.$router.push({ name: 'InfoSet' })
    }
  },
  computed: {
    userClassName () {
      const userClass = this.userClass
      if (userClass === 0) {
        return 'Violet用户'
      } else if (userClass > 0 && userClass < 11) {
        return '开发者'
      } else if (userClass === 50) {
        return '管理员'
      } else if (userClass === 99) {
        return '最高管理员'
      } else {
        return '未知用户'
      }
    },
    ...mapState({
      info: state => state.user.info,
      name: state => state.user.name,
      email: state => state.user.email,
      userClass: state => state.user.class
    })
  }
}
</script>


<style lang="scss">
.comp-user-profile {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
  .content {
    padding: 10px;
    font-size: 17px;
    p {
      margin: 20px;
    }
    span {
      display: inline-block;
      color: #555;
      width: 130px;
    }
  }
  .control {
    text-align: right;
  }
}
</style>

