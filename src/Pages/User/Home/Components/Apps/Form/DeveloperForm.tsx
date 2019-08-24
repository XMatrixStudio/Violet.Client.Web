import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './DeveloperForm.less'
import TextArea from 'antd/lib/input/TextArea'
import { inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import DevService from 'src/Services/DevService'
import UserStore from 'src/Store/UserStore'

interface IDeveloperFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
class DeveloperForm extends Component<IDeveloperFormProps> {
  componentWillMount() {
    const formType = this.props.match.params.type
    switch (formType) {
      case 'edit':
        this.props.UIStore!.setTitle(
          '修改开发者信息',
          '请填写新的联系方式(内部使用), 方便我们与您进行联系'
        )
        break
      case 'developer':
        this.props.UIStore!.setTitle(
          '申请成为开发者',
          '请填写您的联系方式(内部使用), 成为一名开发者'
        )
        break
      case 'admin':
        this.props.UIStore!.setTitle(
          '申请成为管理员',
          '系统管理员仅允许内部人员申请'
        )
        break
      case 'more':
        this.props.UIStore!.setTitle(
          '申请提高应用上限',
          '请填写您的应用需求，便于我们进行审核'
        )
        break
      case 'moreOrg':
        this.props.UIStore!.setTitle(
          '申请提高组织上限',
          '请填写您的组织需求，便于我们进行审核'
        )
        break
      case 'moreOrgApp':
        this.props.UIStore!.setTitle(
          '申请提高组织应用上限',
          '请填写您的组织应用需求，便于我们进行审核'
        )
        break
    }
    if (formType === 'developer') {
      this.props.UIStore!.setBack('/user/apps/not')
    } else if (formType === 'moreOrg') {
      this.props.UIStore!.setBack('/user/apps?t=new')
    } else {
      this.props.UIStore!.setBack('/user/apps')
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        console.log(err)
        return
      }
      const formType = this.props.match.params.type
      if (formType === 'developer') {
        UserService.UpdateLevel({
          level: 1,
          name: values.developerName,
          email: values.developerEmail,
          phone: values.developerPhone,
          remark: values.developerRemark
        })
          .then(_ => {
            message.success('开发者信息已提交')
            this.props.UserStore!.UpdateInfo()
            this.props.UserStore!.UpdateRequests()
            this.props.history.replace('/user/apps/not')
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'repeat_request':
                  message.error('你已经申请过啦')
                  break
                default:
                  message.error('发生错误: ' + msg)
              }
            })
          })
      } else if (formType === 'admin') {
        UserService.UpdateLevel({ level: 50, remark: values.developerRemark })
          .then(_ => {
            message.success('申请已提交')
            this.props.UserStore!.UpdateRequests()
            this.props.history.push('/user/apps')
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'repeat_request':
                  message.error('你已经申请过啦')
                  break
                default:
                  message.error('发生错误: ' + msg)
              }
            })
          })
      } else if (formType === 'edit') {
        UserService.UpdateDevInfo({
          name: values.developerName,
          email: values.developerEmail,
          phone: values.developerPhone
        })
          .then(msg => {
            message.success('修改开发者信息成功')
            this.props.UserStore!.UpdateInfo()
            this.props.history.replace('/user/apps')
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              message.error('发生错误: ' + msg)
            })
          })
      } else if (formType === 'more' || formType === 'moreOrg') {
        try {
          const req = {
            remark: values.developerRemark
          }
          console.log(formType)
          if (formType === 'more') {
            await DevService.improveAppCount(req)
            this.props.UserStore!.UpdateRequests()
            this.props.history.push('/user/apps')
          } else if (formType === 'moreOrg') {
            await DevService.improveOrgCount(req)
            this.props.UserStore!.UpdateRequests()
            this.props.history.push('/user/apps?t=new')
          }
          message.success('申请已提交')
        } catch (error) {
          ServiceTool.errorHandler(error, msg => {
            switch (msg) {
              case 'repeat_request':
                message.error('你已经申请过啦')
                break
              default:
                message.error('发生错误: ' + msg)
            }
          })
        }
      } else {
        message.error('暂未开放')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formType = this.props.match.params.type

    const showInfo = formType === 'edit' || formType === 'developer'
    const showRemark = formType !== 'edit'

    const FormItemsInfo = (
      <>
        <Form.Item label='联系名称'>
          {getFieldDecorator('developerName', {
            rules: [
              {
                required: showInfo,
                message: '请输入联系名称'
              }
            ],
            initialValue:
              formType === 'edit' && this.props.UserStore!.data.dev
                ? this.props.UserStore!.data.dev.name
                : ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label='联系邮箱'>
          {getFieldDecorator('developerEmail', {
            rules: [
              {
                required: showInfo,
                message: '请输入联系邮箱'
              },
              {
                type: 'email',
                message: '邮箱格式不正确'
              }
            ],
            initialValue:
              formType === 'edit' && this.props.UserStore!.data.dev
                ? this.props.UserStore!.data.dev.email
                : ''
          })(<Input />)}
        </Form.Item>
        <Form.Item label='联系手机'>
          {getFieldDecorator('developerPhone', {
            rules: [
              {
                required: showInfo,
                message: '请输入联系手机'
              }
            ],
            initialValue:
              formType === 'edit' && this.props.UserStore!.data.dev
                ? this.props.UserStore!.data.dev.phone
                : ''
          })(<Input />)}
        </Form.Item>
      </>
    )

    const FromItemRemark = (
      <Form.Item label='备注'>
        {getFieldDecorator('developerRemark', {
          rules: [
            {
              required: showRemark,
              message: '请输入备注'
            },
            {
              max: 256,
              message: '备注不能超过256个字符'
            }
          ]
        })(<TextArea rows={4} />)}
      </Form.Item>
    )

    return (
      <div className='developer-form'>
        <div className='base-card-box'>
          <Form className='my-form' onSubmit={this.handleSubmit}>
            {showInfo && FormItemsInfo}
            {showRemark && FromItemRemark}
            <Button type='primary' htmlType='submit'>
              提交信息
            </Button>
            <Button
              className='back-btn'
              onClick={() => {
                this.props.history.push('/user/apps')
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

export default Form.create()(withRouter(DeveloperForm))
