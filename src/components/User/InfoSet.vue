<template>
  <Card class="comp-user-info" dis-hover>
    <vTitle>
      <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 编辑个人信息</vTitle>
    <div>
      <Form ref="infoForm" :model="infoForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="个人简介" prop="bio">
          <Input v-model="infoForm.bio" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="个人主页" prop="bio">
          <Input class="inputShow" v-model="infoForm.url" placeholder="个人主页"></Input>
        </FormItem>
        <FormItem label="手机" prop="phone">
          <Input class="inputShow" v-model="infoForm.phone" placeholder="你的手机号码"></Input>
          <i-switch v-model="infoForm.show.phone" size="large">
            <span slot="open">公开</span>
            <span slot="close">私密</span>
          </i-switch>
        </FormItem>
        <FormItem label="位置" prop="location">
          <Input class="inputShow" v-model="infoForm.location" placeholder="你所在的城市"></Input>
          <i-switch v-model="infoForm.show.location" size="large">
            <span slot="open">公开</span>
            <span slot="close">私密</span>
          </i-switch>
        </FormItem>
        <FormItem label="生日">
          <FormItem prop="date">
            <DatePicker class="inputShow" type="date" placeholder="Select date" v-model="infoForm.birthDate"></DatePicker>
            <i-switch v-model="infoForm.show.birthDate" size="large">
              <span slot="open">公开</span>
              <span slot="close">私密</span>
            </i-switch>
          </FormItem>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="infoForm.gender">
            <Radio label="1">男</Radio>
            <Radio label="2">女</Radio>
            <Radio label="0">其他</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('infoForm')">确认修改</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>

<script>
import vTitle from './vTitle'
import { mapState } from 'vuex'
export default {
  components: {
    'vTitle': vTitle
  },
  computed: mapState({
    date: state => state.user.info.birthDate,
    location: state => state.user.info.location,
    gender: state => state.user.info.gender,
    phone: state => state.user.info.phone,
    bio: state => state.user.info.bio,
    url: state => state.user.info.url,
    showBirthDate: state => state.user.info.show.birthDate,
    showPhone: state => state.user.info.show.phone,
    showLocation: state => state.user.info.show.location
  }),
  data () {
    return {
      infoForm: {
        url: '',
        location: '',
        gender: '',
        birthDate: '',
        bio: '',
        phone: '',
        show: {
          birthDate: true,
          phone: true,
          location: true
        }
      },
      ruleValidate: {
      }
    }
  },
  mounted () {
    this.getInfo()
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
    },
    async getInfo () {
      this.infoForm.location = this.location
      this.infoForm.gender = this.gender
      this.infoForm.birthDate = this.date
      this.infoForm.phone = this.phone
      this.infoForm.bio = this.bio
      this.infoForm.url = this.url
      this.infoForm.show.birthDate = this.showBirthDate
      this.infoForm.show.phone = this.showPhone
      this.infoForm.show.location = this.showLocation
    },
    async setInfo () {
      try {
        await this.$https.patch('/self/users/baseInfo/', this.$qs.stringify({
          gender: this.infoForm.gender,
          location: this.infoForm.location,
          birthDate: this.Format(new Date(this.infoForm.birthDate), 'yyyy-MM-dd'),
          phone: this.infoForm.phone,
          bio: this.infoForm.bio,
          url: this.infoForm.url,
          showBirthDate: this.infoForm.show.birthDate,
          showPhone: this.infoForm.show.phone,
          showLocation: this.infoForm.show.location
        }))
        this.$store.commit('setUserInfo', (await this.$https.get('/self/users/baseInfo/?t=' + new Date().getTime())).data)
        this.getInfo()
        this.$Notice.success({
          title: '修改成功'
        })
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
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.setInfo()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.comp-user-info {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
  .inputShow {
    width: 70%;
    margin-right: 20px;
  }
}
</style>
