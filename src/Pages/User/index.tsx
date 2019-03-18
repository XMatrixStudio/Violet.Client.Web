import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import * as serviceWorker from '../../serviceWorker'

// router
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
// store
import AuthStore from 'src/Store/AuthStore'
import UserStore from 'src/Store/UserStore'

import { Root } from '../../Components/Root'
import Home from './Containers/Home/Home'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)
const rootStore = {
  AuthStore: new AuthStore(),
  UserStore: new UserStore(),
  router: routerStore
}

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <Home />
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

serviceWorker.unregister()
