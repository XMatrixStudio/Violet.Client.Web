import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { RouteComponentProps } from 'react-router'
import UIStore from 'src/Store/UIStore'
import { inject, observer } from 'mobx-react'

interface IAppInitProps extends RouteComponentProps<any> {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class AppInit extends Component<IAppInitProps> {
  componentWillMount() {
    this.props.UIStore!.setTitle('应用管理', '成为开发者即可创建你的应用')
  }

  render() {
    return (
      <div className='not-dev'>
        <p className='oops-icon'>
          <Icon type='frown' theme='twoTone' twoToneColor='#7ce0de' />
        </p>
        <p>你当前还不是开发者，快点申请成为开发者吧</p>
        <Button
          type='primary'
          onClick={() => {
            this.props.history.push('/user/apps/up/developer')
          }}
        >
          成为一名开发者
        </Button>
      </div>
    )
  }
}

export default AppInit
