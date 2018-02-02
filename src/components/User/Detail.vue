<template>
  <Card class="comp-user-detail" dis-hover>
    <vTitle>
      <i class="fa fa-info fa-fw" aria-hidden="true"></i> {{language.title}}
      <span class="helper">
        <a @click="backList">{{language.backToList}}</a> |
        <a target="_blank" href="https://oauth.xmatrix.studio/doc/?url=v2.yml">{{language.help}}</a>
      </span>
    </vTitle>
    <div class="content-box">
      <div class="left-box">
        <div>
          <i class="fa fa-address-card-o fa-fw" aria-hidden="true"></i>
          {{language.id}}：
          <Tooltip :content="language.clickToCopy" placement="top">
            <Tag color="green">
              <span id="idText" @click="copyId">{{client._id}}</span>
            </Tag>
          </Tooltip>
        </div>
        <div>
          <p>
            <i class="fa fa-key fa-fw" aria-hidden="true"></i>{{language.key}}（{{language.keyHelp}}）：
          </p>
          <p>
            <Tooltip :content="language.clickToCopy" placement="top">
              <Tag color="green">
                <span @click="copyKey">{{client.key}}</span>
              </Tag>
            </Tooltip>
            <Button @click="changeKey" type="dashed">{{language.change}}</Button>
          </p>
        </div>
      </div>
      <div class="right-box">
        <div class="client-icon">
          <img @click="toggleShow" :src="client.icon" alt="Avatar" :title="language.icon" />
          <myUpload :langExt="uploadLanguage" field="img" @crop-success="cropSuccess" v-model="show" :width="200" :height="200" img-format="jpg"></myUpload>
        </div>
      </div>
    </div>
    <Form ref="client" :model="client" :rules="ruleValidate" :label-width="80">
      <FormItem :label="language.name" prop="name">
        <Input clearable v-model="client.name" :placeholder="language.nameHelp"></Input>
      </FormItem>
      <FormItem :label="language.url" prop="url">
        <Input clearable v-model="client.url" :placeholder="language.urlHelp"></Input>
      </FormItem>
      <FormItem :label="language.callBack" prop="callBack">
        <Input clearable v-model="client.callBack" :placeholder="language.callBackHelp"></Input>
      </FormItem>
      <FormItem :label="language.detail" prop="detail">
        <Input v-model="client.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="language.detailHelp"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('client')">{{language.submit}}</Button>
        <Button type="error" @click="deleteClient">{{language.delete}}</Button>
      </FormItem>
    </Form>
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
    copyId () {
      this.copyText(this.client._id)
    },
    copyKey () {
      this.copyText(this.client.key)
    },
    copyText (text) {
      let target = document.createElement('textarea')
      target.style.position = 'absolute'
      target.style.left = '-9999px'
      target.style.top = '0'
      target.textContent = text
      document.body.appendChild(target)
      target.focus()
      target.setSelectionRange(0, target.value.length)
      try {
        document.execCommand('copy')
        target.remove()
        this.$Message.success(this.language.copySuccess)
      } catch (e) {
        this.$Message.error(this.language.copyFail)
      }
    },
    backList () {
      this.$router.push({ name: 'dev' })
    },
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
        setTimeout(async () => {
          await this.getInfo()
        }, 1000)
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
    this.$Loading.finish()
  }
}
</script>

<style lang="scss">
.comp-user-detail {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px;
  .helper {
    margin-top: 13px;
    font-size: 16px;
    float: right;
  }
  .content-box {
    display: flex;
    width: 100%;
    align-content: stretch;
    justify-content: space-between;
    margin-bottom: 20px;
    .left-box {
      vertical-align: top;
      display: inline-block;
      text-align: left;
      > div {
        margin: 20px 10px;
      }
    }
    .right-box {
      display: inline-block;
      text-align: right;
      .client-icon {
        margin-top: 10px;
        margin-right: 20px;
        text-align: center;
        > img {
          &:hover {
            transform: translateY(-4px);
          }
          cursor: pointer;
          transition: all 0.5s;
          margin: 10px;
          border-radius: 10px;
          height: 80px;
          width: 80px;
        }
      }
    }
  }
  .control {
    text-align: right;
  }
}
</style>
