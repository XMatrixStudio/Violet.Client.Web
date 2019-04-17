import React, { Component } from 'react'
import './TopBanner.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { Icon } from 'antd'

interface ITopBannerProps {
  UIStore?: UIStore
  extend: boolean
  change: () => void
}

@inject('UIStore')
@observer
class TopBanner extends Component<ITopBannerProps> {
  render() {
    const state = this.props.UIStore!.state
    const extend = this.props.extend
    return (
      <div
        className={'top-banner' + (extend ? ' extend-banner' : ' small-banner')}
      >
        <div className='top-title'>
          <div className='big-title'>
            {extend ? state.title : state.shrinkTitle}
          </div>
          <div className='sub-title'>{state.subElement || state.subTitle}</div>
        </div>
        <div className='box-1' />
        <div className='box-2' />
        <div className='box-3' />
        <Icon
          onClick={() => {
            this.props.change()
          }}
          className='icon-extend'
          type={extend ? 'caret-up' : 'caret-down'}
        />
      </div>
    )
  }
}

export default TopBanner
