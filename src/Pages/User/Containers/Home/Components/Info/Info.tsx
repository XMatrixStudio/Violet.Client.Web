import './Info.less'
import React, { Component } from 'react'

import ShowInfo from './ShowInfo/ShowInfo'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import EditInfo from './EditInfo/EditInfo'
import Nothing from '../Nothing/Nothing'

interface IInfoProps extends RouteComponentProps<any> {}

class Info extends Component<IInfoProps, any> {
  render() {
    return (
      <div className='info-content'>
        <Switch>
          <Route exact={true} path='/user/info/edit' component={EditInfo} />
          <Route exact={true} path='/user/info'>
            <ShowInfo
              onClickEdit={() => {
                this.props.history.push('/user/info/edit')
              }}
            />
          </Route>
          <Route component={Nothing} />
        </Switch>
      </div>
    )
  }
}

export default Info
