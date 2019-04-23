import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import * as serviceWorker from '../../serviceWorker'

// router
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import AuthStore from 'src/Store/AuthStore'
const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)
const rootStore = {
  router: routerStore,
  AuthStore: new AuthStore()
}

import { Root } from '../../Components/Root'
import Account from './Account/Account'

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <Account />
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
serviceWorker.unregister()
