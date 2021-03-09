import React from 'react';
import logo from '@/assets/img/logo.svg';
import './App.scss';
import { rootStore, StoreContext } from '@/store/RootStore';
import { Link, Route, Switch } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';
import Login from './login/Login'

function App() {
  const store = useLocalObservable(() => rootStore)

  return (
    <StoreContext.Provider value={store}>
      <div className="app-layout">
        <div className="top-layout">
          <img className="logo" src={logo} alt="logo" />
          <span className="logo-title">Violet</span>
        </div>
        <Switch>
          <Route path="/account/register">
            <div className="App">
              <header className="App-header">
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
              </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React Account y
              </a>
              </header>
            </div>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        <div className="foot-layout">
          <Switch>
            <Route path="/">
              <span className="foot-text">还没有账户？</span>
              <Link to="/account/register" className="text-btn">创建一个</Link>
            </Route>
          </Switch>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
