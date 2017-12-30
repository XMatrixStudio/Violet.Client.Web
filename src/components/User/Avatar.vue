<template>
  <Card class="comp-user-info" dis-hover>
    <vTitle>
      <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 编辑个人信息</vTitle>
    <div>
      <a class="ivu-btn ivu-btn-info" @click="toggleShow">设置头像</a>
      <my-upload field="img" @crop-success="cropSuccess" v-model="show" :width="200" :height="200" img-format="jpg"></my-upload>
    </div>
  </Card>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
import vTitle from './vTitle'

export default {
  components: {
    'my-upload': myUpload,
    'vTitle': vTitle
  },
  data () {
    return {
      show: false,
      imgDataUrl: ''
    }
  },
  methods: {
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
        console.log(error.response)
      }
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
  .avatar {
    height: 200px;
    width: 200px;
  }
}
</style>
