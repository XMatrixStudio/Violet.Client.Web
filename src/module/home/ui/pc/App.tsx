import { IStyle, keyframes, mergeStyleSets } from '@fluentui/react'
import React from 'react'
import logo from 'assets/logo.svg'
import { color } from 'style'
import NavBar from './components/NavBar'

const appLogoSpin = keyframes({
  from: {
    transform: ' rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
})

const styles = mergeStyleSets({
  header: {
    backgroundColor: color.background,
    minHeight: '200vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    // '& img': {
    //   background: '#123'
    // } as IStyle
  } as IStyle,
  logo: {
    height: '40vmin',
    pointerEvents: 'none',
    '@media (prefers-reduced-motion: no-preference) ': {
      animation: appLogoSpin + ' infinite 20s linear'
    } as IStyle
  } as IStyle,
  link: {
    color: '#61dafb',
    transition: 'all .2s',
    ':hover': {
      fontSize: '24px'
    } as IStyle
  } as IStyle
})

function App() {
  return (
    <div>
      <NavBar />
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home PC
        </a>
      </header>
    </div>
  );
}

export default App;
