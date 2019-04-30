import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import './NewAppForm.less'
import { Input, Button, Select, message, Icon, Tooltip } from 'antd'
import AvatarSelect from '../../Common/AvatarSelect'
import AddImage from '@/Assets/add.png'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import UserStore from 'src/Store/UserStore'
import { observable } from 'mobx'
import ServiceTool from 'src/Services/ServiceTool'
import DevService from 'src/Services/DevService'

interface INewAppFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class NewAppForm extends Component<INewAppFormProps> {
  @observable appIcon?: string
  id = 1
  ByName: string

  componentWillMount() {
    this.ByName = this.props.match.params.by
    this.props.UIStore!.setTitle(
      <>
        <a
          key='link'
          onClick={() => {
            this.goBack(this.ByName, false)
          }}
        >
          应用管理
        </a>
        <span key='more'> - 新建应用</span>
      </>,
      '创建新的应用'
    )
    this.props.UIStore!.setBack(() => {
      this.goBack(this.ByName, false)
    })
  }

  goBack = (byName: string, finished: boolean) => {
    this.props.history.push(
      '/user/apps' + (byName === 'me' ? '' : '?t=' + byName)
    )
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // appClass: "2"
        // appDetail: "123"
        // appDisplayName: "123"
        // appHome: "123"
        // appName: "1221"
        // callback: (2)["12", "12412"]
        // keys: (2)["0", "1"]
        if (this.appIcon && this.appIcon.length > 102400) {
          message.error('应用图标过大')
          return
        }
        const finish = message.loading('应用信息上传中...')

        const callbacks: string[] = []
        for (const k of values.keys) {
          callbacks.push(values.callback[k])
        }
        const ByName = this.props.match.params.by
        DevService.newApp({
          avatar: this.appIcon,
          callbackHosts: callbacks,
          description: values.appDetail,
          displayName: values.appDisplayName,
          name: values.appName,
          type: parseInt(values.appClass, 10),
          url: values.appHome,
          owner:
            ByName === 'me' ? this.props.UserStore!.state.info.name : ByName
        })
          .then(_ => {
            finish()
            message.success('创建应用成功')
            this.props.UserStore!.updateInfo()
            this.goBack(ByName, true)
          })
          .catch(error => {
            finish()
            ServiceTool.errorHandler(error, msg => {
              // exist_name - 应用已存在
              // limit_apps - 应用数量达到上限
              // not_exist_owner - 用户 / 组织不存在
              // reserved_name - 应用保留
              switch (msg) {
                case 'exist_name':
                case 'reserved_name':
                  message.error('应用名已存在')
                  break
                case 'limit_apps':
                  message.error('应用数量达到上限')
                  break
                case 'not_exist_owner':
                  message.error('用户 / 组织不存在')
                  break
                default:
                  message.error('发生错误' + msg)
              }
            })
          })
      }
    })
  }

  remove = (k: string) => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: string) => key !== k)
    })
  }

  add = () => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat((this.id++).toString())
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form

    const UserInfo = this.props.UserStore!.state.info

    if (!UserInfo.dev) {
      return null
    }

    const ByName = this.props.match.params.by

    getFieldDecorator('keys', { initialValue: ['0'] })
    const keys: string[] = getFieldValue('keys')
    const CallbackItems = keys.map((k, index) => (
      <Form.Item
        label={
          index === 0 ? (
            <span>
              应用回调域
              <Tooltip title='调用API时, 回调地址必须属于应用回调域，你可以添加多个回调域分别用于线上和测试'>
                <Icon
                  className='tip-icon'
                  type='question-circle'
                  theme='twoTone'
                  twoToneColor='#b3b3b3'
                />
              </Tooltip>
            </span>
          ) : (
            ''
          )
        }
        required={true}
        key={k}
      >
        {getFieldDecorator(`callback[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: '请输入应用回调域'
            }
          ]
        })(
          <Input placeholder='https://example.com/' style={{ width: '90%' }} />
        )}
        {index > 0 ? (
          <Icon
            className='dy-icons'
            type='minus'
            onClick={() => this.remove(k)}
          />
        ) : (
          <Icon className='dy-icons' type='plus' onClick={() => this.add()} />
        )}
      </Form.Item>
    ))

    return (
      <div className='app-form'>
        <div className='base-card-box'>
          <Form className='my-form' onSubmit={this.handleSubmit}>
            <div className='app-by'>
              <span style={{ marginLeft: '10px' }}>
                应用所有者
                <Tooltip title='决定应用属于个人或是组织'>
                  <Icon
                    className='tip-icon'
                    type='question-circle'
                    theme='twoTone'
                    twoToneColor='#b3b3b3'
                  />
                </Tooltip>
              </span>
              {' : '}
              {ByName === 'me' ? (
                <span style={{ marginLeft: '12px' }}>
                  <strong style={{ marginRight: '6px' }}>
                    {UserInfo.info.nickname}
                  </strong>
                  (自己 - {UserInfo.dev.appOwn}/{UserInfo.dev.appLimit})
                </span>
              ) : (
                <span>{ByName}(组织)</span>
              )}
            </div>
            <Form.Item
              className='item-app-icon'
              label={
                <span>
                  应用图标
                  <Tooltip title='应用图标将会在授权时候展示'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              <AvatarSelect
                imageURL={this.appIcon || AddImage}
                setImage={base64 => {
                  this.appIcon = base64
                }}
                title='点击或拖动选择应用图标'
              />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  应用分类
                  <Tooltip title='应用分类信息决定应用会出现在平台应用中心哪个类别的列表中，并在各处展示中出现。'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('appClass', {
                rules: [
                  {
                    required: true,
                    message: '请选择应用分类'
                  }
                ]
              })(
                <Select style={{ maxWidth: '300px' }}>
                  <Select.Option value='1'>游戏</Select.Option>
                  <Select.Option value='2'>工具</Select.Option>
                  <Select.Option value='3'>娱乐</Select.Option>
                  <Select.Option value='4'>生活</Select.Option>
                  <Select.Option value='5'>社交</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  应用名称
                  <Tooltip title='应用名称是应用在平台唯一标识，不可修改，请慎重填写。'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('appName', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称'
                  },
                  {
                    pattern: /^[a-zA-Z]+/,
                    message: '应用名由字母开头'
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]*$/,
                    message: '应用名由大小写字母, 数字, 下划线和横线组成'
                  },
                  {
                    max: 32,
                    message: '应用名长度不能超过32位'
                  }
                ]
              })(<Input placeholder='应用名称' />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  应用显示名
                  <Tooltip title='应用显示名会在授权/市场等地方展示'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('appDisplayName', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用显示名'
                  },
                  {
                    max: 32,
                    message: '应用显示名名长度不能超过32位'
                  }
                ]
              })(<Input placeholder='应用显示名' />)}
            </Form.Item>
            <Form.Item label='应用描述'>
              {getFieldDecorator('appDetail', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用描述'
                  },
                  {
                    max: 128,
                    message: '应用描述长度不能超过128位'
                  }
                ]
              })(<Input placeholder='简短地描述你的应用' />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  应用主页
                  <Tooltip title='应用主页会在各处展示中出现'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('appHome', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用主页'
                  }
                ]
              })(<Input placeholder='https://example.com' />)}
            </Form.Item>
            {CallbackItems}
            <Button type='primary' htmlType='submit'>
              创建应用
            </Button>
            <Button
              className='back-btn'
              onClick={() => {
                this.goBack(ByName, false)
              }}
            >
              取消
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Form.create()(NewAppForm))
