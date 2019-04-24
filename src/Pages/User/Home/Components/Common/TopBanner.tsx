import React, { Component } from 'react'
import './TopBanner.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

interface ITopBannerProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class TopBanner extends Component<ITopBannerProps> {
  render() {
    const state = this.props.UIStore!.state
    const ui = this.props.UIStore!.ui
    return (
      <div
        className={
          'top-banner' + (ui.topBanner ? ' extend-banner' : ' small-banner')
        }
      >
        <div className='top-title'>
          {state.back !== undefined &&
            (typeof state.back === 'string' ? (
              <div className='back-icon'>
                <Link to={state.back}>
                  <Icon type='left' />
                </Link>
              </div>
            ) : (
              <div className='back-icon'>
                <Icon type='left' onClick={state.back} />
              </div>
            ))}
          <div
            className={
              'big-title ' + (state.back !== undefined ? 'with-back' : '')
            }
          >
            {ui.topBanner ? state.title : state.shrinkTitle}
          </div>
          <div
            className={
              'sub-title ' + (state.back !== undefined ? 'with-back' : '')
            }
          >
            {state.subTitle}
          </div>
        </div>
        <div className='box-1' />
        <div className='box-2' />
        <div className='box-3' />
        <Icon
          onClick={() => {
            this.props.UIStore!.setTopBanner(!ui.topBanner)
          }}
          className='icon-extend'
          type={ui.topBanner ? 'caret-up' : 'caret-down'}
        />
      </div>
    )
  }
}

export default TopBanner
