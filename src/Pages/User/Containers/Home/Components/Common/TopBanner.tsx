import React, { Component } from 'react'
import './TopBanner.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface ITopBannerProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class TopBanner extends Component<ITopBannerProps> {
  render() {
    return (
      <div className='top-banner'>
        <div className='top-title'>
          <p className='big-title'>{this.props.UIStore!.state.title}</p>
          <p className='sub-title'>{this.props.UIStore!.state.subTitle}</p>
        </div>
        <div className='box-1' />
        <div className='box-2' />
        <div className='box-3' />
      </div>
    )
  }
}

export default TopBanner
