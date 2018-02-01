<template>
  <Card class="comp-user-info" dis-hover>
    <vTitle>
      <i class="fa fa-sliders fa-fw" aria-hidden="true"></i> {{language.edit}}</vTitle>
    <div>
      <Form ref="infoForm" :model="infoForm" :rules="ruleValidate" :label-width="80">
        <FormItem :label="language.bio" prop="bio">
          <Input v-model="infoForm.bio" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem :label="language.url" prop="url">
          <Input class="inputShow" v-model="infoForm.url" :placeholder="language.url"></Input>
        </FormItem>
        <FormItem :label="language.phone" prop="phone">
          <Input class="inputShow" v-model="infoForm.phone" :placeholder="language.phone"></Input>
          <i-switch v-model="infoForm.show.phone" size="large">
            <span slot="open">{{language.switchOn}}</span>
            <span slot="close">{{language.switchOff}}</span>
          </i-switch>
        </FormItem>
        <FormItem :label="language.location" prop="location">
          <Input class="inputShow" v-model="infoForm.location" :placeholder="language.locationInput"></Input>
          <i-switch v-model="infoForm.show.location" size="large">
            <span slot="open">{{language.switchOn}}</span>
            <span slot="close">{{language.switchOff}}</span>
          </i-switch>
        </FormItem>
        <FormItem :label="language.brithDate">
          <FormItem prop="date">
            <DatePicker class="inputShow" type="date" placeholder="Select date" v-model="infoForm.birthDate"></DatePicker>
            <i-switch v-model="infoForm.show.birthDate" size="large">
              <span slot="open">{{language.switchOn}}</span>
              <span slot="close">{{language.switchOff}}</span>
            </i-switch>
          </FormItem>
        </FormItem>
        <FormItem :label="language.gender.label" prop="gender">
          <RadioGroup v-model="infoForm.gender">
            <Radio label="1">{{language.gender.man}}</Radio>
            <Radio label="2">{{language.gender.woman}}</Radio>
            <Radio label="0">{{language.gender.other}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="setUserInfo('infoForm')">{{language.submit}}</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import { mapState } from 'vuex'
export default {
  components: {
    'vTitle': vTitle
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    }),
    language () {
      return this.$store.getters.language.UserInfo
    }
  },
  data () {
    return {
      overflow: '',
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
        url: [
          { type: 'string', max: 256, message: '', trigger: 'blur' }
        ],
        bio: [
          { type: 'string', max: 512, message: '', trigger: 'blur' }
        ],
        location: [
          { type: 'string', max: 64, message: '', trigger: 'blur' }
        ],
        phone: [
          { type: 'string', max: 16, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.infoForm = this.info
    for (let i in this.ruleValidate) {
      this.ruleValidate[i][0].message = this.language.overflow.replace('%d', this.ruleValidate[i][0].max)
    }
  },
  methods: {
    setUserInfo (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            await this.$service.user.setUserInfo.call(this, this.$qs.stringify({
              gender: this.infoForm.gender,
              location: this.infoForm.location,
              birthDate: this.infoForm.birthDate === '' ? '' : this.$util.formatDate(new Date(this.infoForm.birthDate), 'yyyy-MM-dd'),
              phone: this.infoForm.phone,
              bio: this.infoForm.bio,
              url: this.infoForm.url,
              showBirthDate: this.infoForm.show.birthDate,
              showPhone: this.infoForm.show.phone,
              showLocation: this.infoForm.show.location
            }))
            await this.$service.user.getUserBaseInfo.call(this)
            this.infoForm = this.info
            this.$Notice.success({
              title: this.language.success
            })
          } catch (error) {
            this.$service.errorHandle.call(this, error, message => {
              if (message === 'invalid_date') {
                this.$Notice.warning({
                  title: this.language.invalid
                })
              } else {
                this.$Notice.warning({
                  title: this.language.error + message
                })
              }
            })
          }
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
