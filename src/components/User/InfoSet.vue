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
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
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
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
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
