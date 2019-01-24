import React, { Component } from 'react'
import './Register.less'
import StepBar from './Components/StepBar'
import { RouteComponentProps, withRouter } from 'react-router'
import { Card, Icon, Button } from 'antd'
import ValidForm from './Components/ValidForm'
import InfoForm from './Components/InfoForm'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

interface IRouterProps extends RouteComponentProps<any> {}

@observer
class Register extends Component<IRouterProps> {
  @observable currentStep = 0
  @observable id = 'Null'

  constructor(props: IRouterProps) {
    super(props)
  }

  nextStep = (id?: string) => {
    if (id !== undefined) {
      this.id = id
    }
    this.currentStep++
  }

  UserForm = () => {
    switch (this.currentStep) {
      case 1:
        return <InfoForm next={this.nextStep} id={this.id} />
      case 0:
        return <ValidForm next={this.nextStep} />
      default:
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
    return (
      <div className='comp-register'>
        <StepBar currentStep={this.currentStep} />
        <Card className='account-card' bodyStyle={{ textAlign: 'center' }}>
          <this.BackIcon />
          <div className='card-title'>
            <p className='title-to'>注 册</p>
            <div className='line' />
            <this.UserForm />
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(Register)
