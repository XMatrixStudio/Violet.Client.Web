import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import * as serviceWorker from '../../serviceWorker'

// router
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)
const rootStore = {
  router: routerStore
}

import { Root } from '../../Root'
import Account from './Containers/Account/Account'
import './index.tsx'

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
