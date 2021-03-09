import React from 'react';
import logo from '@/assets/img/logo.svg';
import './App.scss';
import { rootStore, StoreContext } from '@/store/RootStore';
import { Link, Route, Switch } from 'react-router-dom';
import { useLocalObservable } from 'mobx-react-lite';
import Login from './login/Login'
import Register from './register/Register'

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
            <Register/>
          </Route>
          <Route path="/account">
            <Login />
          </Route>
        </Switch>
        <div className="foot-layout">
          <Switch>
            <Route path="/account/register">
              <span className="foot-text">已有账号？</span>
              <Link to="/account" className="text-btn">立刻登录</Link>
            </Route>
            <Route path="/account">
              <span className="foot-text">还没有账号？</span>
              <Link to="/account/register" className="text-btn">创建一个</Link>
            </Route>
          </Switch>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
