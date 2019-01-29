import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import * as serviceWorker from '../../serviceWorker'

// router
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)
const rootStore = {
  router: routerStore
}

import { Root } from '../../Components/Root'
import '@/Lib/AnimatedRouter/animate.css'
import './index.tsx'
import AnimatedRouter from '../../Lib/AnimatedRouter/AnimatedRouter'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Auth from './Components/Auth/Auth'
import Reset from './Components/Reset/Reset'

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <div className='account-div'>
          <p
            className='account-title'
            onClick={() => {
              window.location.href = '/' // 返回主页
            }}
          >
            Violet
          </p>
          <AnimatedRouter>
            <Route exact={true} path='/account' component={Login} />
            <Route path='/account/register' component={Register} />
            <Route path='/account/auth' component={Auth} />
            <Route path='/account/reset' component={Reset} />
          </AnimatedRouter>
        </div>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
serviceWorker.unregister()
