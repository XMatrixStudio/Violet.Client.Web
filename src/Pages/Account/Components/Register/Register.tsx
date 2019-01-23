import React, { Component } from 'react'
import './Register.less'
import StepBar from './Components/StepBar'
import { Route, RouteComponentProps, withRouter } from 'react-router'
import { Card, Icon } from 'antd'
import ValidForm from './Components/ValidForm'
import InfoForm from './Components/InfoForm'

interface IRouterProps extends RouteComponentProps<any> {}

class Register extends Component<IRouterProps> {
  public render() {
    return (
      <div className='comp-register'>
        <StepBar />
        <Card className='account-card' bodyStyle={{ textAlign: 'center' }}>
          <Icon
            onClick={() => {
              const { pathname } = this.props.location
              if (pathname.includes('/account/register/info')) {
                this.props.history.replace('/account/register')
              } else if (pathname.includes('/account/register')) {
                this.props.history.replace('/account')
              } else {
                this.props.history.replace('/account')
              }
            }}
            type='arrow-left'
            className='icon-color icon-back'
          />

          <div className='card-title'>
            <p className='title-to'>注 册</p>
            <div className='line' />
            <Route
              exact={true}
              path='/account/register'
              component={ValidForm}
            />
            <Route
              exact={true}
              path='/account/register/info'
              component={InfoForm}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(Register)
