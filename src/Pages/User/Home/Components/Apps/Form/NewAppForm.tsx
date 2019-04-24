import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import './NewAppForm.less'
import { Input, Button, Select, message, Icon, Tooltip } from 'antd'
import AvatarSelect from '../../Common/AvatarSelect'
import AddImage from '@/Assets/add.png'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { Link } from 'react-router-dom'
import UserStore from 'src/Store/UserStore'
import { observable } from 'mobx'

interface INewAppFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  next: (isEdit: boolean) => void
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class NewAppForm extends Component<INewAppFormProps> {
  @observable appIcon?: string

  componentWillMount() {
    this.props.UIStore!.setTitle(
      <>
        <Link key='link' to='/user/apps'>
          应用管理
        </Link>
        <span key='more'> - 新建应用</span>
      </>,
      '创建新的应用'
    )
    this.props.UIStore!.setBack('/user/apps')
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.appIcon === undefined) {
          message.error('请选择应用图标')
        } else {
          console.log(values)
          // this.props.next(true)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const UserInfo = this.props.UserStore!.state.info

    if (!UserInfo.dev) {
      return null
    }

    const ByName = this.props.match.params.by

    return (
      <div className='app-form'>
        <div className='base-card-box'>
          <Form className='my-form' onSubmit={this.handleSubmit}>
            <div className='app-by'>
              <span>
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
                <span>
                  {UserInfo.info.nickname} ({UserInfo.dev.app.own}/
                  {UserInfo.dev.app.limit})
                </span>
              ) : null}
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
                  <Tooltip title='应用名称是应用在平台唯一标识，请慎重填写。'>
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
                  }
                ]
              })(<Input placeholder='应用名称' />)}
            </Form.Item>
            <Form.Item label='应用描述'>
              {getFieldDecorator('appDetail', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用描述'
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
            <Form.Item
              label={
                <span>
                  应用回调域
                  <Tooltip title='调用API时, 回调地址必须属于应用回调域'>
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
              {getFieldDecorator('appCallBack', {
                rules: [
                  {
                    required: true,
                    message: '请输入回调地址'
                  }
                ]
              })(<Input placeholder='https://example.com/verify' />)}
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              创建应用
            </Button>
            <Button
              className='back-btn'
              onClick={() => {
                this.props.next(false)
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
