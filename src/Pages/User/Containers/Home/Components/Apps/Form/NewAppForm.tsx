import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import './NewAppForm.less'
import { Input, Button, Select, message, Icon, Tooltip } from 'antd'
import AvatarSelect from '../../Utils/AvatarSelect'
import AddImage from '@/Assets/add.png'

interface INewAppFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  next: (isEdit: boolean) => void
}

class NewAppForm extends Component<INewAppFormProps> {
  appIcon?: File

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.appIcon === undefined) {
          message.error('请选择应用图标')
        } else {
          console.log(values)
          this.props.next(true)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='app-form'>
        <div className='base-card-box'>
          <div className='form-title'>完善应用信息</div>
          <Form className='my-form' onSubmit={this.handleSubmit}>
            <Form.Item
              label={
                <span>
                  应用归属
                  <Tooltip title='决定应用属于个人或是组织'>
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
              {getFieldDecorator('appFrom', {
                initialValue: 'personal',
                rules: [
                  {
                    required: true,
                    message: '请选择创建位置'
                  }
                ]
              })(
                <Select style={{ maxWidth: '300px' }}>
                  <Select.OptGroup label='个人'>
                    <Select.Option value='personal'>
                      ZhenlyChen (3/10)
                    </Select.Option>
                  </Select.OptGroup>
                  <Select.OptGroup label='组织'>
                    <Select.Option value='org'>XMatrix (1/10)</Select.Option>
                  </Select.OptGroup>
                </Select>
              )}
            </Form.Item>
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
                imageURL={AddImage}
                setImage={file => {
                  this.appIcon = file
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
                  <Select.Option value='game'>游戏</Select.Option>
                  <Select.Option value='tool'>工具</Select.Option>
                  <Select.Option value='entertainment'>娱乐</Select.Option>
                  <Select.Option value='live'>生活</Select.Option>
                  <Select.Option value='social '>社交</Select.Option>
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
