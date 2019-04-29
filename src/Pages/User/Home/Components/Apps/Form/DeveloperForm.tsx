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

interface IDeveloperFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  UIStore?: UIStore
}

@inject('UIStore')
class DeveloperForm extends Component<IDeveloperFormProps> {
  componentWillMount() {
    const formType = this.props.match.params.type
    switch (formType) {
      case 'edit':
        this.props.UIStore!.setTitle(
          <span key='more'>修改开发者信息</span>,
          '请填写新的联系方式(内部使用), 方便我们与您进行联系'
        )
        break
      case 'developer':
        this.props.UIStore!.setTitle(
          <span>申请成为开发者</span>,
          '请填写您的联系方式(内部使用), 成为一名开发者'
        )
        break
      case 'admin':
        this.props.UIStore!.setTitle(
          <span>申请成为管理员</span>,
          '系统管理员仅允许内部人员申请'
        )
        break
      case 'more':
        this.props.UIStore!.setTitle(
          <span>申请提高应用上限</span>,
          '请填写您的应用需求，便于我们进行审核'
        )
        break
      case 'moreOrg':
        this.props.UIStore!.setTitle(
          <span>申请提高组织上限</span>,
          '请填写您的组织需求，便于我们进行审核'
        )
        break
    }
    if (formType === 'developer') {
      this.props.UIStore!.setBack('/user/apps/not')
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
      } else {
        try {
          const req = {
            remark: values.developerRemark
          }
          console.log(formType)
          if (formType === 'more') {
            await DevService.improveAppCount(req)
          } else if (formType === 'moreOrg') {
            await DevService.improveOrgCount(req)
          }
          message.success('申请已提交')
          this.props.history.push('/user/apps')
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
            ]
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
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='联系手机'>
          {getFieldDecorator('developerPhone', {
            rules: [
              {
                required: showInfo,
                message: '请输入联系手机'
              }
            ]
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
    )
  }
}

export default withRouter(Form.create()(DeveloperForm))
