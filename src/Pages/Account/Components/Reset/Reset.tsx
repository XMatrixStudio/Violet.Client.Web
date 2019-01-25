import React, { Component } from 'react'
import './Reset.less'
import { Card, Icon, Button } from 'antd'
import { RouteComponentProps } from 'react-router'
import ResetForm from './Components/ResetForm'
import TypeForm from './Components/TypeForm'

interface IResetProps extends RouteComponentProps<any> {}

class Reset extends Component<IResetProps, any> {
  currentStep = 0

  UserForm = () => {
    switch (this.currentStep) {
      case 1:
        return (
          <TypeForm
            next={() => {
              this.currentStep = 2
              this.setState({})
            }}
          />
        )
      case 2:
        return (
          <div>
            <Icon
              type='check'
              className='icon-color'
              style={{ fontSize: '30px', margin: '48px' }}
            />
            <p>重置密码成功</p>
            <Button
              type='primary'
              className='reset-btn'
              onClick={() => {
                this.props.history.replace('/account')
              }}
            >
              立即登陆
            </Button>
          </div>
        )
      default:
        return (
          <ResetForm
            next={() => {
              this.currentStep = 1
              this.setState({})
            }}
          />
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
              this.setState({})
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
      <div className='comp-reset'>
        <Card className='account-card' bodyStyle={{ textAlign: 'center' }}>
          <this.BackIcon />
          <div className='card-title'>
            <p className='title-to'>找回密码</p>
            <div className='line' />
          </div>
          <this.UserForm />
        </Card>
      </div>
    )
  }
}

export default Reset
