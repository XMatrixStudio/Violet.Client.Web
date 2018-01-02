<template>
  <Card class="comp-user-profile" dis-hover>
    <vTitle>
      <p>
        <i class="fa fa-circle-o fa-fw" aria-hidden="true"></i> {{name}}
        <Tag color="green">{{userClassName}}</Tag>
      </p>
      <p class="bio">{{info.bio}}</p>
    </vTitle>
    <div class="content">
      <p>
        <span>
          <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>
        </span>{{email}}</p>
      <p v-if="info.url">
        <span>
          <i class="fa fa-home fa-fw" aria-hidden="true"></i>
        </span>
        <a target="_blank" :href="info.url">{{info.url}}</a>
      </p>
      <p v-if="info.phone">
        <span>
          <i class="fa fa-mobile fa-fw" aria-hidden="true"></i>
        </span>{{info.phone}}</p>

      <p v-if="info.birthDate">
        <span>
          <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i>
        </span>{{birthDate}}</p>
      <p v-if="info.location">
        <span>
          <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i>
        </span>{{info.location}}</p>

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
    Format: function (date, fmt) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
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
    birthDate () {
      if (this.info.birthDate) {
        return this.Format(new Date(this.info.birthDate), 'yyyy-MM-dd')
      } else {
        return ''
      }
    },
    ...mapState({
      info: state => state.user.info,
      name: state => state.user.name,
      email: state => state.user.email,
      userClass: state => state.user.userClass
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
  .fa-circle-o {
    color: rgb(27, 204, 51);
  }
  .bio {
    font-size: 16px;
    color: #80848f;
    margin-left: 40px;
    margin-top: 10px;
  }
  .content {
    padding: 10px;
    font-size: 17px;
    p {
      margin: 20px;
    }
    span {
      display: inline-block;
      color: #555;
      width: 40px;
    }
  }
  .control {
    text-align: right;
  }
}
</style>

