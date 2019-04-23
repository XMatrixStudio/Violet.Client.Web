import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './Home.less'
import TopScreen from './Components/TopScreen'
import DetailScreen from './Components/DetailScreen'

@inject('router')
@observer
class Home extends React.Component {
  public render() {
    return (
      <div className='Home'>
        <TopScreen />
        <DetailScreen />
      </div>
    )
  }
}

export default Home
