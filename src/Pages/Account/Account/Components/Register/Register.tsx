import React, { Component } from 'react'
import './Register.less'
import { RouteComponentProps, withRouter } from 'react-router'
import { Icon, Button } from 'antd'
import ValidForm from './Components/ValidForm'
import InfoForm from './Components/InfoForm'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Title from './Components/Title'
import { CSSTransition } from 'react-transition-group'
import RouterUtil from '../Util/RouterUtil'

interface IRouterProps extends RouteComponentProps<any> {}

@observer
class Register extends Component<IRouterProps> {
  @observable currentStep = 0
  @observable id = 'Null'
  @observable showAnim = false

  nextStep = (id?: string) => {
    if (id !== undefined) {
      this.id = id
    }
    this.currentStep++
    this.showAnim = true
    if (this.currentStep > 3) {
      this.currentStep = 0
    }
  }

  componentDidMount() {
    document.title = '注册 | Violet'
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
              this.showAnim = true
            } else if (this.currentStep === 0) {
              RouterUtil.GoBackAccount(this.props.history, this.props.location)
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
        <div className='base-card-box account-card'>
          <this.BackIcon />
          <div className='card-title'>
            <Title currentStep={currentStep} />
            <div className='line' />
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
        </div>
      </div>
    )
  }
}

export default withRouter(Register)
