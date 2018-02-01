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
        <span :title="language.email">
          <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>
        </span>{{email}}</p>
      <p v-if="info.url">
        <span :title="language.url">
          <i class="fa fa-home fa-fw" aria-hidden="true"></i>
        </span>
        <a target="_blank" :href="info.url">{{info.url}}</a>
      </p>
      <p v-if="info.phone">
        <span :title="language.phone">
          <i class="fa fa-mobile fa-fw" aria-hidden="true"></i>
        </span>{{info.phone}}</p>

      <p v-if="info.birthDate">
        <span :title="language.birthDate">
          <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i>
        </span>{{birthDate}}</p>
      <p v-if="info.location">
        <span :title="language.location">
          <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i>
        </span>{{info.location}}</p>

    </div>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import { mapState } from 'vuex'
export default {
  components: { vTitle },
  computed: {
    userClassName () {
      const userClass = this.userClass
      if (userClass === 0) {
        return this.language.className[0]
      } else if (userClass > 0 && userClass < 11) {
        return this.language.className[1]
      } else if (userClass === 50) {
        return this.language.className[2]
      } else if (userClass === 99) {
        return this.language.className[3]
      } else {
        return this.language.className[4]
      }
    },
    birthDate () {
      if (this.info.birthDate) {
        return this.$util.formatDate(new Date(this.info.birthDate), 'yyyy-MM-dd')
      } else {
        return ''
      }
    },
    language() {
      return this.$store.getters.language.UserInfo
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
    .fa {
      transition: all .4s;
      &:hover {
        transform: translateY(-4px);
      }
    }
  }
  .control {
    text-align: right;
  }
}
</style>

