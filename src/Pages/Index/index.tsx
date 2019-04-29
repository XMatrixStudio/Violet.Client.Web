import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import * as serviceWorker from '../../serviceWorker'

// router
import { Route, Router, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
// store
import AuthStore from '../../Store/AuthStore'

import { Root } from '../../Components/Root'
import Home from './Home/Home'
import About from './About/About'
import NavBar from './Components/NavBar'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)
const rootStore = {
  auth: new AuthStore(),
  router: routerStore
}

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <div>
          <NavBar />
          <Home />
        </div>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

serviceWorker.unregister()
