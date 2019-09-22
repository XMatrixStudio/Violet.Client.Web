import * as React from 'react'
import './ResetMain.less'
import { Switch, Route } from 'react-router'
import { useObserver } from 'mobx-react-lite'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ValidForm from './Form/ValidForm'
import PasswordForm from './Form/PasswordForm'
import FinishForm from './Form/FinishForm'
import ChooseForm from './Form/ChooseForm'
import FeedbackForm from './Form/FeedbackForm'
import useRouter from 'use-react-router'

export interface IResetMainProps {}

export default function ResetMain(props: IResetMainProps) {
  const { location } = useRouter()

  return useObserver(() => (
    <div className='layout-reset-main'>
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
            <Route path='/account/reset/finish' component={FinishForm} />
            <Route path='/account/reset/password' component={PasswordForm} />
            <Route path='/account/reset/valid' component={ValidForm} />
            <Route path='/account/reset/feedback' component={FeedbackForm} />
            <Route path='/account/reset' component={ChooseForm} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  ))
}
