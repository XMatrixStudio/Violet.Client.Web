import React, { Component } from 'react'
import './Setting.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface ISettingProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class Setting extends Component<ISettingProps> {
  componentDidMount() {
    this.props.UIStore!.setTitle('系统设置', '', '')
  }
  render() {
    return <div>设置</div>
  }
}

export default Setting
