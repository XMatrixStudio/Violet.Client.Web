import React, { Component } from 'react'
import './AppInfoForm.less'
import { Form, Input, Button, Tooltip, Icon, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface IAppInfoFormProps {
  form: WrappedFormUtils
  initData: {
    name: string
    category: string
    describe: string
    home: string
    callback: string
  }
  next: (isEdit: boolean) => void
}

class AppInfoForm extends Component<IAppInfoFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        this.props.next(true)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const initData = this.props.initData
    return (
      <div className='app-info-form'>
        <div className='form-title'>修改应用信息</div>
        <Form className='my-form' onSubmit={this.handleSubmit}>
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
              ],
              initialValue: initData.category
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
                  message: '请输入应用名'
                }
              ],
              initialValue: initData.name
            })(<Input placeholder='应用名称' />)}
          </Form.Item>
          <Form.Item label='应用简介'>
            {getFieldDecorator('appDescribe', {
              rules: [
                {
                  required: true,
                  message: '请输入应用简介'
                }
              ],
              initialValue: initData.describe
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
              ],
              initialValue: initData.home
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
                  message: '请输入应用回调域'
                }
              ],
              initialValue: initData.callback
            })(<Input placeholder='https://example.com/verify' />)}
          </Form.Item>
          <Button htmlType='submit' type='primary'>
            保存
          </Button>
          <Button
            style={{ marginLeft: '20px' }}
            onClick={() => {
              this.props.next(false)
            }}
          >
            取消
          </Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(AppInfoForm)
