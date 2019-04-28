import React, { Component } from 'react'
import './Help.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import Nothing from '../Nothing/Nothing'

interface IUIStoreProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class Help extends Component<IUIStoreProps> {
  componentDidMount() {
    this.props.UIStore!.setTitle('帮助', 'Coming soon!')
  }
  render() {
    return <Nothing />
  }
}

export default Help
