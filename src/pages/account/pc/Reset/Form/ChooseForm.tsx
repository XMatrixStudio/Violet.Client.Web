import React from 'react'
import { Icon } from 'antd'
import { useChooseForm } from '../../../core/Reset/ChooseForm'

export default function ChooseForm() {
  const { handleValid, handleFeedback } = useChooseForm()

  return (
    <div className='reset-form reset-choose-form'>
      <p className='big-title'>请选择找回密码的方式</p>
      <div className='choose-box' onClick={handleValid}>
        <Icon
          className='choose-icon'
          type='mail'
          theme='twoTone'
          twoToneColor='#8a6bbe'
        />
        <span className='choose-text'>我想通过验证手机/邮箱找回密码</span>
      </div>
      <div className='choose-box' onClick={handleFeedback}>
        <Icon
          className='choose-icon'
          type='smile'
          theme='twoTone'
          twoToneColor='#8a6bbe'
        />
        <span className='choose-text'>
          不记得手机/邮箱了，我想通过人工申诉找回密码
        </span>
      </div>
    </div>
  )
}
