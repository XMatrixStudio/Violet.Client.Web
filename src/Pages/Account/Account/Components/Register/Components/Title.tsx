import React, { Component } from 'react'

interface ITitleProp {
  currentStep: number
}

class Title extends Component<ITitleProp, any> {
  render() {
    switch (this.props.currentStep) {
      case 1:
        return <p className='title-to'>完善信息</p>
      case 2:
        return <p className='title-to'>准备就绪</p>
      default:
        return <p className='title-to'>注 册</p>
    }
  }
}

export default Title
