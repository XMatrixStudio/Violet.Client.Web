import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'
import '../../Assets/variable.less'
import registerServiceWorker from '../../registerServiceWorker'

// router
import { Route, Router, Switch } from 'react-router'
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
import About from '../../Components/About'
import Account from './Containers/Account/Account'

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <Switch>
          <Route exact={true} path='/account' component={Account} />
          <Route path='/account/about' component={About} />
        </Switch>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
