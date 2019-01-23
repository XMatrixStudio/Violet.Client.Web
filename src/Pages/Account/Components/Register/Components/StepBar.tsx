import React, { Component } from 'react'
import { Steps } from 'antd'
const Step = Steps.Step

class StepBar extends Component {
  render() {
    return (
      <div
        style={{
          margin: '10px auto',
          maxWidth: '500px'
        }}
      >
        <Steps progressDot={true} current={0}>
          <Step title='验证' />
          <Step title='完善信息' />
          <Step title='注册成功' />
        </Steps>
        ,
      </div>
    )
  }
}

export default StepBar
