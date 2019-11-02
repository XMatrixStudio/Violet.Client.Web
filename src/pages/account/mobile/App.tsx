import React from 'react'
import logo from '@/assets/images/logo.svg'
import './App.less'
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { useApp } from '../core/App'
import { storeContext } from '@/Store'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import LoginMain from './Login/LoginMain'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8a6bbe'
    }
  }
})

const App: React.FC = () => {
  const { store, location } = useApp()

  return (
    <storeContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <div className='app'>
          <header className='app-header'>
            <img src={logo} className='app-logo' alt='logo' />
            <p className='violet'>Violet</p>
          </header>
          <TransitionGroup className='layout-transition'>
            <CSSTransition
              key={location.pathname}
              classNames={{
                enter: 'animated fadeIn'
              }}
              exit={false}
              timeout={300}
            >
              <Switch location={location}>
                <Route path='/account-m' component={LoginMain} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </ThemeProvider>
    </storeContext.Provider>
  )
}

export default App
