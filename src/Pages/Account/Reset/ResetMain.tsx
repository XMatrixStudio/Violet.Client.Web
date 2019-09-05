import * as React from 'react'
import './ResetMain.less'
import { Switch, Route } from 'react-router'
import { useObserver } from 'mobx-react-lite'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ValidForm from './Form/ValidForm'
import InfoForm from './Form/InfoForm'
import FinishForm from './Form/FinishForm'
import ChooseForm from './Form/ChooseForm'
import useRouter from 'use-react-router'

export interface IResetMainProps {}

export default function ResetMain(props: IResetMainProps) {
  const { location, history } = useRouter()

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
            <Route path='/account/reset' component={ChooseForm} />
            <Route path='/account/reset/finish' component={FinishForm} />
            <Route path='/account/reset/info'>
              <InfoForm
                next={() => {
                  history.push('/account/reset/finish')
                }}
              />
            </Route>
            <Route path='/account/reset/valid'>
              <ValidForm
                next={id => {
                  history.push('/account/reset/info?id=' + id)
                }}
              />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  ))
}
