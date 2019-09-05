/***
 * 倒计时按钮
 */
import * as React from 'react'
import { Button } from 'antd'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export interface ICountDownButtonProps {
  sendCaptcha: () => void
  lastTime: number
}

export default function CountDownButton(props: ICountDownButtonProps) {
  const data = useLocalStore(() => ({
    timer: -1,
    waitTime: 90,
    buttonTitle: '发送验证码'
  }))

  const getRemainTime = () => {
    const time = new Date().getTime() - new Date(props.lastTime).getTime()
    return data.waitTime - time / 1000
  }

  const refreshTitle = () => {
    if (data.timer !== -1) {
      window.clearTimeout(data.timer)
    }
    const remainTime = getRemainTime()
    if (remainTime < data.waitTime && remainTime > 0) {
      data.timer = window.setTimeout(() => {
        refreshTitle()
      }, 1000)
      data.buttonTitle = remainTime.toFixed(0).toString() + 's 后重试'
    } else {
      data.buttonTitle = '发送验证码'
    }
  }

  React.useEffect(() => {
    refreshTitle()
    return () => {
      // 清除计时器
      if (data.timer !== -1) {
        clearTimeout(data.timer)
      }
    }
    // eslint-disable-next-line
  }, [])

  return useObserver(() => (
    <Button
      disabled={getRemainTime() < data.waitTime && getRemainTime() > 0}
      type='primary'
      onClick={props.sendCaptcha}
      ghost={true}
    >
      {data.buttonTitle}
    </Button>
  ))
}
