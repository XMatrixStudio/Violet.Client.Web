import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.less'
import '../../Assets/variable.less'
import registerServiceWorker from '../../registerServiceWorker'

// router
import { Route, Router, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
// store
import AuthStore from '../../Store/AuthStore'

import { Root } from '../../Root'
import About from '../../Components/About'

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
        <Switch>
          <Route exact={true} path='/' component={App} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
