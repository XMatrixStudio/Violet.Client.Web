import React, { Component } from 'react'
import { Steps } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
const Step = Steps.Step

interface IRouterProps extends RouteComponentProps<any> {
  currentStep: number
}

class StepBar extends Component<IRouterProps> {
  render() {
    return (
      <div
        style={{
          margin: '10px auto',
          maxWidth: '500px'
        }}
      >
        <Steps progressDot={true} current={this.props.currentStep}>
          <Step title='验证' />
          <Step title='完善信息' />
          <Step title='注册成功' />
        </Steps>
        ,
      </div>
    )
  }
}

export default withRouter(StepBar)
