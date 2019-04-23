import React, { Component } from 'react'
import './Reset.less'
import { Icon, Button } from 'antd'
import { RouteComponentProps } from 'react-router'
import ResetForm from './Components/ResetForm'
import TypeForm from './Components/TypeForm'
import { CSSTransition } from 'react-transition-group'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import RouterUtil from '../Util/RouterUtil'

interface IResetProps extends RouteComponentProps<any> {}

@observer
class Reset extends Component<IResetProps, any> {
  @observable showAnim = false
  @observable currentStep = 1

  componentDidMount() {
    document.title = '重置密码 | Violet'
  }
  UserForm = () => {
    switch (this.currentStep) {
      case 1:
        return (
          <TypeForm
            next={() => {
              this.currentStep = 2
              this.showAnim = true
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
                RouterUtil.GoBackAccount(
                  this.props.history,
                  this.props.location
                )
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
              this.showAnim = true
            }}
          />
        )
    }
  }

  BackIcon = () => {
    if (this.currentStep < 3) {
      return (
        <Icon
          type='arrow-left'
          className='icon-back'
          onClick={() => {
            RouterUtil.GoBackAccount(this.props.history, this.props.location)
            // if (this.currentStep === 1) {
            //   this.currentStep--
            //   this.showAnim = true
            // } else if (this.currentStep === 0) {
            //   RouterUtil.GoBackAccount(this.props.history, this.props.location)
            // }
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
        <this.BackIcon />
        <div className='card-title'>
          <p className='title-to'>找回密码</p>
          <div className='line' />
        </div>
        <CSSTransition
          in={this.showAnim}
          classNames={{
            enterActive: 'animated fadeIn faster'
          }}
          timeout={500}
          onEntered={() => {
            this.showAnim = false
          }}
        >
          <this.UserForm />
        </CSSTransition>
      </div>
    )
  }
}

export default Reset
