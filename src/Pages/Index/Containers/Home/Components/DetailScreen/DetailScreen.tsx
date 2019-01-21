import * as React from 'react'
import './DetailScreen.less'

import IconSecurity from '@/Assets/Home/security.png'
import IconNew from '@/Assets/Home/new.png'
import IconThunder from '@/Assets/Home/thunder.png'

class DetailScreen extends React.Component {
  public render() {
    return (
      <div className='comp-detail'>
        <div className='detail-box'>
          <p className='icon'>
            <img src={IconSecurity} />
          </p>
          <p className='title'>安全</p>
          <p className='detail'>
            基于OAuth2.0，多重防御措施，全程加密通讯，保护你的账号安全
          </p>
        </div>
        <div className='detail-box'>
          <p className='icon'>
            <img src={IconThunder} />
          </p>
          <p className='title'>极速</p>
          <p className='detail'>极速授权，一键访问你的所有应用</p>
        </div>
        <div className='detail-box'>
          <p className='icon'>
            <img src={IconNew} />
          </p>
          <p className='title'>先进</p>
          <p className='detail'>
            采用最强的秀秀作为程序员，写出来的BUG绝无代码
          </p>
        </div>
      </div>
    )
  }
}

export default DetailScreen
