import React from 'react'

import NavBar from './components/NavBar'
import Intro from './components/Intro'
import { mergeStyles } from '@fluentui/react';
import { color } from 'style';

function App() {

  const appStyle = mergeStyles({
    color: color.textPrimary
  })

  return (
    <div className={appStyle}>
      <NavBar />
      <Intro />
    </div>
  );
}

export default App;
