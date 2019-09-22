/***
 * 倒计时按钮
 */
import * as React from 'react'
import { Button } from 'antd'
import { useObserver } from 'mobx-react-lite'
import {
  ICountDownButtonProps,
  useCountDownButton
} from '../../core/Components/CountDownButton'

export default function CountDownButton(props: ICountDownButtonProps) {
  const { data, getRemainTime, handleSend } = useCountDownButton(props)

  return useObserver(() => (
    <Button
      disabled={getRemainTime() < data.waitTime && getRemainTime() > 0}
      type='primary'
      onClick={handleSend}
      ghost={true}
    >
      {data.buttonTitle}
    </Button>
  ))
}
