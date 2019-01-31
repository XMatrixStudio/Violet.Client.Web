import React, { Component } from 'react'
import { Button } from 'antd'

interface ICountDownProps {
  sendCaptcha: () => void
  lastTime: Date
}

class CountDownButton extends Component<ICountDownProps> {
  timer: any | null

  constructor(props: ICountDownProps) {
    super(props)
    this.timer = null
  }

  remainTime = () => {
    const time = new Date().getTime() - new Date(this.props.lastTime).getTime()
    return 60 - time / 1000
  }

  buttonTitle = () => {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
    const remainTime = this.remainTime()
    if (remainTime < 60 && remainTime > 0) {
      this.timer = setTimeout(() => {
        this.setState({})
      }, 1000)
      return remainTime.toFixed(0).toString() + 's 后重试'
    }
    return '获取验证码'
  }

  render() {
    return (
      <Button
        disabled={this.remainTime() < 60 && this.remainTime() > 0}
        type='primary'
        className='bg-color'
        style={{ color: '#fff' }}
        onClick={this.props.sendCaptcha}
      >
        {this.buttonTitle()}
      </Button>
    )
  }
}

export default CountDownButton
