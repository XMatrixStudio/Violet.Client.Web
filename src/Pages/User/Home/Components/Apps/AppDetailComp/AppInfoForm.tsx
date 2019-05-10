import React, { Component } from 'react'
import './AppInfoForm.less'
import { Form, Input, Button, Tooltip, Icon, Select, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import StaticValues from 'src/Assets/StaticValues'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import DevService from 'src/Services/DevService'
import ServiceTool from 'src/Services/ServiceTool'

interface IAppInfoFormProps {
  form: WrappedFormUtils
  initData: Type.AppInfoData
  next: (isEdit: boolean) => void
}

@observer
class AppInfoForm extends Component<IAppInfoFormProps> {
  id = 1
  @observable callbackKeys = ['0']

  @action
  componentWillMount() {
    const initData = this.props.initData
    if (initData && initData.callbackHosts!.length !== 0) {
      initData.callbackHosts!.forEach((v, i) => {
        if (i > 0) {
          this.callbackKeys = this.callbackKeys.concat((this.id++).toString())
        }
      })
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // appClass: 4
        // appDetail: "很好"
        // appDisplayName: "测试"
        // appHome: "https://baidu.com"
        // callback_0: "https://baidu.com"
        // callback_1: "https://localhost:30020/"
        const callbackHosts = this.callbackKeys.map(v => {
          return values['callback_' + v]
        })
        DevService.updateApp(
          {
            displayName: values.appDisplayName,
            description: values.appDetail,
            type: values.appClass,
            url: values.appHome,
            callbackHosts: callbackHosts
          },
          this.props.initData.id
        )
          .then(res => {
            message.success('修改信息成功')
            this.props.next(true)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              message.error('修改失败,' + msg)
            })
          })
      }
    })
  }

  @action
  remove = (k: string) => {
    if (this.callbackKeys.length === 1) {
      return
    }
    this.callbackKeys = this.callbackKeys.filter((key: string) => key !== k)
  }

  @action
  add = () => {
    this.callbackKeys = this.callbackKeys.concat((this.id++).toString())
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const initData = this.props.initData
    const CallbackItems = this.callbackKeys.map((k, index) => (
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
        {getFieldDecorator(`callback_${k}`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: '请输入应用回调域'
            }
          ],
          initialValue: initData.callbackHosts ? initData.callbackHosts[k] : ''
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
              initialValue: initData.type
            })(
              <Select style={{ maxWidth: '300px' }}>
                {StaticValues.AppTypes.map((v, i) => {
                  return (
                    <Select.Option key={v} value={i + 1}>
                      {v}
                    </Select.Option>
                  )
                })}
              </Select>
            )}
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
              ],
              initialValue: initData.info.displayName
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
              ],
              initialValue: initData.info.description
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
              initialValue: initData.info.url
            })(<Input placeholder='https://example.com' />)}
          </Form.Item>
          {CallbackItems}
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
