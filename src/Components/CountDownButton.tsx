import React, { Component } from 'react'
import { Button } from 'antd'

interface ICountDownProps {
  sendCaptcha: () => void
  lastTime: Date
}

class CountDownButton extends Component<ICountDownProps> {
  timer: any | null
  waitTime: number

  constructor(props: ICountDownProps) {
    super(props)
    this.timer = null
    this.waitTime = 60
  }

  remainTime = () => {
    const time = new Date().getTime() - new Date(this.props.lastTime).getTime()
    return this.waitTime - time / 1000
  }

  componentWillUnmount() {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
  }

  buttonTitle = () => {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
    const remainTime = this.remainTime()
    if (remainTime < this.waitTime && remainTime > 0) {
      this.timer = setTimeout(() => {
        this.setState({})
      }, 1000)
      return remainTime.toFixed(0).toString() + 's 后重试'
    }
    return '发送验证码'
  }

  render() {
    return (
      <Button
        disabled={this.remainTime() < this.waitTime && this.remainTime() > 0}
        type='primary'
        className='bg-color'
        style={{ marginTop: '0' }}
        onClick={this.props.sendCaptcha}
      >
        {this.buttonTitle()}
      </Button>
    )
  }
}

export default CountDownButton
