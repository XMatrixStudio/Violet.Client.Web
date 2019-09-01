import * as React from 'react'
import './RegisterMain.less'
import { Switch, Route } from 'react-router'
import ValidForm from './ValidForm/ValidForm'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import InfoForm from './ValidForm/InfoForm'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export interface IRegisterMainProps {}

export default function RegisterMain(props: IRegisterMainProps) {
  const data = useLocalStore(() => ({
    currentStep: 0,
    id: null as (string | null)
  }))

  const nextStep = () => {
    data.currentStep++
  }

  return useObserver(() => (
    <div className='layout-register-main'>
      <TransitionGroup style={{ width: '100%' }}>
        <CSSTransition
          key={data.currentStep}
          classNames={{
            enter: 'animated fadeIn faster'
          }}
          exit={false}
          timeout={1000}
        >
          <Switch>
            <Route exact path='/account/register/info'>
              <InfoForm id={data.id} next={nextStep} />
            </Route>
            <Route path='/account/register' component={ValidForm} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  ))
}
