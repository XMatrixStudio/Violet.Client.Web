import React from 'react'
import logo from '@/assets/images/logo.svg'
import './App.less'
import { createMuiTheme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8a6bbe'
    }
  }
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>AccountMobile</p>
          <Button color='primary'>Hello</Button>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
