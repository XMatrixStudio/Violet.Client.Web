import React from 'react'
import './index.less'
import { Icon } from 'antd'
import ScrollAnimation from 'react-animate-on-scroll'

import IconSecurity from '@/assets/home/security.png'
import IconNew from '@/assets/home/new.png'
import IconThunder from '@/assets/home/thunder.png'

const Main: React.FC = () => {

  return (
    <div className='comp-index'>
      <div className='comp-index-top'>
        <ScrollAnimation animateIn='fadeIn' className='big-text'>
          <p>Violet 中央授权系统</p>
          <p>第三代</p>
          <p>全新形象</p>
          <a href='//github.com/XMatrixStudio/Violet' target='_blank' rel='noopener noreferrer'>
            <Icon type='github' /> Github
          </a>
        </ScrollAnimation>
      </div>

      <div className='comp-index-detail'>
        <ScrollAnimation className='detail-box' animateIn='bounceInLeft'>
          <p className='icon'>
            <img src={IconSecurity} alt='security' />
          </p>
          <p className='title'>安全</p>
          <p className='detail'>
            基于OAuth2.0，多重防御措施，全程加密通讯，保护你的账号安全
          </p>
        </ScrollAnimation>
        <ScrollAnimation className='detail-box' animateIn='bounceInUp'>
          <p className='icon'>
            <img src={IconThunder} alt='thunder'/>
          </p>
          <p className='title'>极速</p>
          <p className='detail'>极速授权，一键访问你的所有应用</p>
        </ScrollAnimation>
        <ScrollAnimation className='detail-box' animateIn='bounceInRight'>
          <p className='icon'>
            <img src={IconNew} alt='new' />
          </p>
          <p className='title'>先进</p>
          <p className='detail'>
            采用最强的秀秀作为程序员，写出来的BUG绝无代码
          </p>
        </ScrollAnimation>
      </div>
    </div>
  )
}

export default Main
