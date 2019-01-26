import * as React from 'react'
import './TopScreen.less'

// import background from '@/Assets/Home/back.png'
import { Icon } from 'antd'
import ScrollAnimation from 'react-animate-on-scroll'

class TopScreen extends React.Component {
  public render() {
    return (
      <div className='comp-index'>
        {/* <img className='background' src={background} /> */}
        <ScrollAnimation animateIn='fadeIn' className='big-text'>
          <p>Violet 中央授权系统</p>
          <p>第三代</p>
          <p>全新形象</p>
          <a href='//github.com/XMatrixStudio/Violet' target='_blank'>
            <Icon type='github' /> Github
          </a>
        </ScrollAnimation>
      </div>
    )
  }
}

export default TopScreen
