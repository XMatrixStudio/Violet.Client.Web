import * as React from 'react'
import './RegisterMain.less'
import { Switch, Route } from 'react-router'
import { useObserver } from 'mobx-react-lite'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ValidForm from './Form/ValidForm'
import InfoForm from './Form/InfoForm'
import FinishForm from './Form/FinishForm'
import useRouter from 'use-react-router'

export default function RegisterMain() {
  const { location } = useRouter()

  return useObserver(() => (
    <div className='layout-register-main'>
      <TransitionGroup style={{ width: '100%' }}>
        <CSSTransition
          key={location.pathname}
          classNames={{
            enter: 'animated fadeIn faster'
          }}
          exit={false}
          timeout={1000}
        >
          <Switch>
            <Route path='/account/register/finish' component={FinishForm} />
            <Route path='/account/register/info' component={InfoForm} />
            <Route path='/account/register' component={ValidForm} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  ))
}
