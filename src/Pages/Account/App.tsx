import { Rate, Button } from 'antd'
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './App.less'

import logo from '../../Assets/logo.svg'

@inject('router')
@observer
class App extends React.Component {
  public render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>
            Welcome to Account
            {this.props.children}
          </h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Rate character='6' />
        <Button type='primary'>Test</Button>
      </div>
    )
  }
}

export default App
