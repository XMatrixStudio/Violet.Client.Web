import React, { Component } from 'react'
import './SettingItem.less'
import { withRouter, RouteComponentProps } from 'react-router'

interface ISettingItemProps extends RouteComponentProps<any> {
  path: string
}

class SettingItem extends Component<ISettingItemProps> {
  render() {
    return (
      <div
        className='system-setting-item'
        onClick={() => {
          this.props.history.push(this.props.path)
        }}
      >
        <div className='base-card-box'>{this.props.children}</div>
      </div>
    )
  }
}

export default withRouter(SettingItem)
