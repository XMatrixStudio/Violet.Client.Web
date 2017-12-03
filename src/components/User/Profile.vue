<template>
  <Card class="comp-user-profile" dis-hover>
    <vTitle>
      <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> 个人信息</vTitle>
    <div class="content">
      <p>
        <span>
          <i class="fa fa-address-card-o fa-fw" aria-hidden="true"></i> 用户名： </span>{{userName}}</p>
      <p>
        <span>
          <i class="fa fa-at fa-fw" aria-hidden="true"></i> 邮箱： </span>{{email}}</p>
      <p>
        <span>
          <i class="fa fa-home fa-fw" aria-hidden="true"></i> 个人主页：</span>{{detail.web}}</p>
      <p>
        <span>
          <i class="fa fa-mobile fa-fw" aria-hidden="true"></i> 手机号码：</span>{{detail.phone}}</p>
      <p>
        <span>
          <i class="fa fa-hashtag fa-fw" aria-hidden="true"></i> 个人说明：</span>{{detail.info}}</p>
      <p>
        <span>
          <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i> 生日： </span>{{detail.birthDate}}</p>
      <p>
        <span>
          <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> 居住地： </span>{{detail.location}}</p>
      <p>
        <span>
          <i class="fa fa-key fa-fw" aria-hidden="true"></i> 账号类型：</span>{{userClassName}}</p>
    </div>
    <div class="control">
       <Button type="warning">修改个人资料</Button>
    </div>
  </Card>
</template>

<script>
import vTitle from './vTitle'
export default {
  components: { vTitle },
  data () {
    return {
      userName: this.$route.params.username,
      nikeName: 'ZhenlyChen',
      email: 'zhenlychen@foxmail.com',
      detail: {
        web: 'blog.zhenly.cn',
        phone: 13300002200,
        info: 'Hello, world',
        sex: 1,
        birthDate: '2017-10-12',
        location: 'GuangZhou',
        avatar: 'https://example.com/fjiewrsdawd.png',
        userClass: 0
      }
    }
  },
  computed: {
    userClassName () {
      const userClass = this.detail.userClass
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
    }
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

