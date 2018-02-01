<template>
  <Card class="comp-user-detail" dis-hover>
    <vTitle>
      <i class="fa fa-info fa-fw" aria-hidden="true"></i> 应用详情</vTitle>
    <div class="left-box">
      <div>
        <i class="fa fa-address-card-o fa-fw" aria-hidden="true"></i>
        <span>ID：{{client._id}}</span>
      </div>
      <div>
        <i class="fa fa-key fa-fw" aria-hidden="true"></i>
        <span>KEY（建议定时更改保证安全）：
          <a @click="changeKey">更换</a>
        </span>
        <p>{{client.key}}</p>
      </div>
      <Form ref="client" :model="client" :rules="ruleValidate" :label-width="80">
        <FormItem label="应用名称" prop="name">
          <Input v-model="client.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="应用主页" prop="url">
          <Input v-model="client.url" placeholder="Enter your home"></Input>
        </FormItem>
        <FormItem label="回调地址" prop="callBack">
          <Input v-model="client.callBack" placeholder="Enter your callback"></Input>
        </FormItem>
        <FormItem label="应用简介" prop="detail">
          <Input v-model="client.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('client')">修改信息</Button>
          <Button type="error" @click="deleteClient">删除应用</Button>
        </FormItem>
      </Form>
    </div>
    <div class="right-box">
      <div class="client-icon">
        <img @click="toggleShow" :src="client.icon" alt="Avatar" title="更改图标" />
        <my-upload field="img" @crop-success="cropSuccess" v-model="show" :width="200" :height="200" img-format="jpg"></my-upload>
      </div>
    </div>
  </Card>
</template>

<script>
import vTitle from './part/vTitle'
import myUpload from 'vue-image-crop-upload'
export default {
  components: { vTitle, myUpload },
  data () {
    return {
      clientId: '',
      client: {},
      show: false,
      ruleValidate: {
        name: [
          { required: true, message: '应用名不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 64, message: '长度需要在1 - 64之间', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '主页不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 512, message: '长度需要在6 - 512之间', trigger: 'blur' }
        ],
        callBack: [
          { required: true, message: '回调地址不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 512, message: '长度需要在6 - 512之间', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '应用简介不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 512, message: '长度需要在6 - 1024之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async changeKey () {
      this.$Modal.confirm({
        title: '更改KEY确认',
        content: '<p>更改KEY之后会导致当前服务立刻失效</p><p>需要重新部署服务才能使用服务</p>',
        onOk: async () => {
          try {
            await this.$service.dev.changeKey.call(this, this.clientId)
            this.$Notice.success({
              title: '修改KEY成功'
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
            title: '无效的应用ID'
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
              title: '修改信息成功'
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
        title: '删除应用确认',
        content: '<p>是否删除应用</p><p><b>' + this.client.name + '</b></p><p>删除之后将不可恢复</p>',
        onOk: async () => {
          try {
            await this.$service.dev.deleteClient.call(this, this.clientId)
            this.$Notice.warning({
              title: '删除应用成功'
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
          title: '修改图标成功'
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
        title: '参数错误'
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
        height: 70px;
        width: 70px;
      }
    }
  }
  .control {
    text-align: right;
  }
}
</style>
