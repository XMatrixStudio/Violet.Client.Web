<template>
  <Card class="comp-user-detail" dis-hover>
    <vTitle>
      <i class="fa fa-info fa-fw" aria-hidden="true"></i> {{language.title}}</vTitle>
    <div class="left-box">
      <div>
        <i class="fa fa-address-card-o fa-fw" aria-hidden="true"></i>
        <span>{{language.id}}：{{client._id}}</span>
      </div>
      <div>
        <i class="fa fa-key fa-fw" aria-hidden="true"></i>
        <span>{{language.key}}（{{language.keyHelp}}）：
          <a @click="changeKey">{{language.change}}</a>
        </span>
        <p>{{client.key}}</p>
      </div>
      <Form ref="client" :model="client" :rules="ruleValidate" :label-width="80">
        <FormItem :label="language.name" prop="name">
          <Input v-model="client.name" :placeholder="language.nameHelp"></Input>
        </FormItem>
        <FormItem :label="language.url" prop="url">
          <Input v-model="client.url" :placeholder="language.urlHelp"></Input>
        </FormItem>
        <FormItem :label="language.callBack" prop="callBack">
          <Input v-model="client.callBack" :placeholder="language.callBackHelp"></Input>
        </FormItem>
        <FormItem :label="language.detail" prop="detail">
          <Input v-model="client.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="language.detailHelp"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('client')">{{language.submit}}</Button>
          <Button type="error" @click="deleteClient">{{language.delete}}</Button>
        </FormItem>
      </Form>
    </div>
    <div class="right-box">
      <a target="_blank" href="https://oauth.xmatrix.studio/doc/?url=v2.yml">{{language.help}}</a>
      <div class="client-icon">
        <img @click="toggleShow" :src="client.icon" alt="Avatar" :title="language.icon" />
        <myUpload :langExt="uploadLanguage" field="img" @crop-success="cropSuccess" v-model="show" :width="200" :height="200" img-format="jpg"></myUpload>
      </div>
    </div>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import myUpload from 'vue-image-crop-upload'
export default {
  components: { vTitle, myUpload },
  computed: {
    language () {
      return this.$store.getters.language.DevDetail
    },
    uploadLanguage () {
      return this.$store.getters.language.Upload
    }
  },
  data () {
    return {
      clientId: '',
      client: {},
      show: false,
      ruleValidate: {
        name: [
          { required: true, message: '', trigger: 'blur' },
          { type: 'string', min: 1, max: 64, message: '', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '', trigger: 'blur' },
          { type: 'string', min: 6, max: 512, message: '', trigger: 'blur' }
        ],
        callBack: [
          { required: true, message: '', trigger: 'blur' },
          { type: 'string', min: 6, max: 512, message: '', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '', trigger: 'blur' },
          { type: 'string', min: 6, max: 512, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setLanguage () {
      this.ruleValidate.name[0].message = this.language.nullName
      this.ruleValidate.url[0].message = this.language.nullUrl
      this.ruleValidate.callBack[0].message = this.language.nullCallBack
      this.ruleValidate.detail[0].message = this.language.nullDetail
      this.ruleValidate.name[1].message = this.language.lengthLimit.replace('%1d', 1).replace('%2d', 64)
      this.ruleValidate.url[1].message = this.language.lengthLimit.replace('%1d', 6).replace('%2d', 512)
      this.ruleValidate.callBack[1].message = this.language.lengthLimit.replace('%1d', 6).replace('%2d', 512)
      this.ruleValidate.detail[1].message = this.language.lengthLimit.replace('%1d', 6).replace('%2d', 1024)
    },
    async changeKey () {
      this.$Modal.confirm({
        title: this.language.keyTitle,
        content: `<p>${this.language.keyContent1}</p><p>${this.language.keyContent2}</p>`,
        okText: this.language.sure,
        cancelText: this.language.cancel,
        onOk: async () => {
          try {
            await this.$service.dev.changeKey.call(this, this.clientId)
            this.$Notice.success({
              title: this.language.keySuccess
            })
            await this.getInfo()
          } catch (error) {
            this.$service.errorHandle.call(this, error)
          }
        }
      })
    },
    async getInfo () {
      try {
        this.clientId = this.$route.query.clientId
        let res = await this.$service.dev.getClient.call(this, this.clientId)
        this.client = res.data
        this.client.icon += '?t=' + new Date().getTime()
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$Notice.warning({
            title: this.language.invalidId
          })
          this.$router.push({ name: 'dev' })
        })
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            await this.$service.dev.setClient.call(this, this.clientId, this.client)
            await this.getInfo()
            this.$Notice.success({
              title: this.language.setSuccess
            })
          } catch (error) {
            this.$service.errorHandle.call(this, error)
          }
        }
      })
    },
    toggleShow () {
      this.show = true
    },
    async deleteClient () {
      this.$Modal.confirm({
        title: this.language.deleteTitle,
        content: `<p>${this.language.deleteContent1}</p><p><b>${this.client.name}</b></p><p>${this.language.deleteContent2}</p>`,
        okText: this.language.sure,
        cancelText: this.language.cancel,
        onOk: async () => {
          try {
            await this.$service.dev.deleteClient.call(this, this.clientId)
            this.$Notice.warning({
              title: this.language.deleteSuccess
            })
            this.$router.push({ name: 'dev' })
          } catch (error) {
            this.$service.errorHandle.call(this, error)
          }
        }
      })
    },
    async cropSuccess (imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
      try {
        await this.$service.dev.setIcon.call(this, this.clientId, imgDataUrl)
        await this.getInfo()
        this.$Notice.success({
          title: this.language.iconSuccess
        })
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  async mounted () {
    if (this.$route.query && this.$route.query.clientId) {
      await this.getInfo()
    } else {
      this.$Notice.warning({
        title: this.language.invalidQuery
      })
      this.$router.push({ name: 'dev' })
    }
  }
}
</script>

<style lang="scss">
.comp-user-detail {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
  .left-box {
    vertical-align: top;
    display: inline-block;
    text-align: left;
    width: 70%;
    > div {
      margin: 20px 10px;
    }
  }
  .right-box {
    display: inline-block;
    text-align: right;
    width: 20%;
    .client-icon {
      margin-top: 50px;
      text-align: center;
      > img {
        &:hover {
          transform: translateY(-4px);
        }
        cursor: pointer;
        transition: all 0.5s;
        margin-top: 30px;
        margin-bottom: 10px;
        border-radius: 10px;
        height: 100px;
        width: 100px;
      }
    }
  }
  .control {
    text-align: right;
  }
}
</style>
