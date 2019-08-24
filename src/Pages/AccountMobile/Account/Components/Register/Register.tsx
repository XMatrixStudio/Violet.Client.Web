import React, { Component } from 'react'
import './Register.less'
import { RouteComponentProps, withRouter } from 'react-router'
import { Icon, Button } from 'antd'
import ValidForm from './Components/ValidForm'
import InfoForm from './Components/InfoForm'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import RouterUtil from '../Util/RouterUtil'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

interface IRouterProps extends RouteComponentProps<any> {}

@observer
class Register extends Component<IRouterProps> {
  @observable currentStep = 0
  @observable id = 'Null'

  @action
  nextStep = () => {
    this.currentStep++
  }

  componentDidMount() {
    document.title = '注册 | Violet'
  }

  UserForm = (step: number) => {
    switch (step) {
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
                this.props.history.push('/account' + this.props.location.search)
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
              RouterUtil.GoBackAccount(this.props.history, this.props.location)
            }
          }}
        />
      )
    } else {
      return null
    }
  }

  RegisterTitle = (step: number) => {
    switch (step) {
      case 1:
        return <p className='title-to'>完善信息</p>
      case 2:
        return <p className='title-to'>准备就绪</p>
      default:
        return <p className='title-to'>注 册</p>
    }
  }

  public render() {
    return (
      <div className='comp-register'>
        <this.BackIcon />
        <div className='card-title'>
          {this.RegisterTitle(this.currentStep)}
          <div className='line' />
          <TransitionGroup>
            <CSSTransition
              key={this.currentStep}
              classNames={{
                enter: 'animated fadeIn faster'
              }}
              exit={false}
              timeout={1000}
            >
              {this.UserForm(this.currentStep)}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withRouter(Register)