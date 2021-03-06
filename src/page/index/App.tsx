import React from 'react'
import logo from '@/assets/logo.svg'
import { observer, useLocalObservable } from "mobx-react-lite"
import { Button } from '@fluentui/react-northstar'

import './App.css'
import { rootStore, StoreContext } from '@/store/RootStore'

function App() {
  // 创建全局 Store
  const store = useLocalObservable(() => rootStore)

  const timer = useLocalObservable(() => ({
    count: 0,
    incr() {
      this.count++
    }
  }))

  // 设置标题
  document.title = 'Violet'

  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> {store.ui.count}
            Edit <code>src/App.tsx</code> and save to reload. {timer.count}
          </p>
          <Button onClick={() => { timer.incr() }} primary >Index</Button>
          <Button onClick={() => { store.ui.add() }} primary>Test</Button>
        </header>
      </div>
    </StoreContext.Provider>
  )
}


export default observer(App)