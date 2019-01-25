import React, { Component } from 'react'
import './Register.less'
import { RouteComponentProps, withRouter } from 'react-router'
import { Card, Icon, Button } from 'antd'
import ValidForm from './Components/ValidForm'
import InfoForm from './Components/InfoForm'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Title from './Components/Title'

interface IRouterProps extends RouteComponentProps<any> {}

@observer
class Register extends Component<IRouterProps> {
  @observable currentStep = 0
  @observable id = 'Null'

  nextStep = (id?: string) => {
    if (id !== undefined) {
      this.id = id
    }
    this.currentStep++
    if (this.currentStep > 3) {
      this.currentStep = 0
    }
  }

  UserForm = () => {
    switch (this.currentStep) {
      case 1:
        return <InfoForm next={this.nextStep} id={this.id} />
      case 2:
        return (
          <div>
            <Icon
              type='check'
              className='icon-color'
              style={{ fontSize: '30px', margin: '48px' }}
            />
            <p>注册成功</p>
            <Button
              type='primary'
              className='register-btn'
              onClick={() => {
                this.props.history.replace('/account')
              }}
            >
              立即登陆
            </Button>
          </div>
        )
      default:
        return <ValidForm next={this.nextStep} />
    }
  }

  BackIcon = () => {
    if (this.currentStep < 2) {
      return (
        <Icon
          type='arrow-left'
          className='icon-back'
          onClick={() => {
            if (this.currentStep === 1) {
              this.currentStep--
            } else if (this.currentStep === 0) {
              this.props.history.replace('/account')
            }
          }}
        />
      )
    } else {
      return null
    }
  }

  public render() {
    const currentStep = this.currentStep
    return (
      <div className='comp-register'>
        <Card className='account-card' bodyStyle={{ textAlign: 'center' }}>
          <this.BackIcon />
          <div className='card-title'>
            <Title currentStep={currentStep} />
            <div className='line' />
            <this.UserForm />
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(Register)
