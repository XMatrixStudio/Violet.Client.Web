import React, { Component } from 'react'
import './OrgInfoForm.less'
import { Form, Tooltip, Icon, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface IPrgInfoFormProps {
  form: WrappedFormUtils
  initData: Type.OrgInfoData
  next: (isEdit: boolean) => void
}

class OrgInfoForm extends Component<IPrgInfoFormProps> {
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
      <div className='org-info-form'>
        <div className='form-title'>修改组织信息</div>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                组织名
                <Tooltip title='组织名是应用在平台唯一标识，请慎重填写。'>
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
            {getFieldDecorator('orgName', {
              rules: [
                {
                  required: true,
                  message: '请输入组织名'
                }
              ],
              initialValue: initData.name
            })(<Input placeholder='组织名' />)}
          </Form.Item>
          <Form.Item label='组织简介'>
            {getFieldDecorator('orgDescribe', {
              initialValue: initData.info.description
            })(<Input placeholder='简短地描述你的组织' />)}
          </Form.Item>
          <Form.Item label='组织主页'>
            {getFieldDecorator('orgHome', {
              initialValue: initData.info.url
            })(<Input placeholder='组织的主页' />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                组织联系人
                <Tooltip title='该信息仅内部使用'>
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
            {getFieldDecorator('orgPeople', {
              rules: [
                {
                  required: true,
                  message: '请输入组织联系人'
                }
              ],
              initialValue: initData.info.contact
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                联系邮箱
                <Tooltip title='该信息仅内部使用'>
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
                  message: '请输入联系邮箱'
                }
              ],
              initialValue: initData.info.email
            })(<Input />)}
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

export default Form.create()(OrgInfoForm)
