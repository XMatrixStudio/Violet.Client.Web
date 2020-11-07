import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { mergeStyles } from '@fluentui/react'

const browserHistory = createBrowserHistory();

const ModuleHome = lazy(() => import('./module/home/App'))
const ModuleAccount = lazy(() => import('./module/account/App'))
const ModuleAdmin = lazy(() => import('./module/admin/App'))

const rootStyle = mergeStyles({
  textAlign: 'center'
})

function App() {
  return (
    <div className={rootStyle}>
      <Router history={browserHistory}>
        <Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route path='/account' component={ModuleAccount} />
            <Route path='/admin' component={ModuleAdmin} />
            <Route path='/' component={ModuleHome} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
