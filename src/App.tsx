import React, { lazy, Suspense, useContext } from 'react';
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { mergeStyles } from '@fluentui/react'
import { UAContext } from '@quentin-sommer/react-useragent';

const browserHistory = createBrowserHistory();


const rootStyle = mergeStyles({
  textAlign: 'center'
})

function App() {

  const { uaResults } = useContext(UAContext)

  // 根据客户端和路由动态加载组件
  const isMobile = (uaResults as { mobile: boolean }).mobile === true
  const ModuleHome = lazy(() =>  isMobile ?  import('./module/home/ui/mobile/App') : import('./module/home/ui/pc/App'))
  const ModuleAccount= lazy(() =>  isMobile ?  import('./module/account/ui/mobile/App') : import('./module/account/ui/pc/App'))
  const ModuleAdmin = lazy(() =>  isMobile ?  import('./module/admin/ui/mobile/App') : import('./module/admin/ui/pc/App'))

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
