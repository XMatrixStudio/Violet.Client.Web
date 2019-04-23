import React, { Component } from 'react'
import './Nothing.less'

class Nothing extends Component {
  componentDidMount() {
    document.title = '用户中心 | Violet'
  }
  render() {
    return (
      <div className='nothing-box'>
        <div className='center-box'>
          <p>Violet</p>
        </div>
      </div>
    )
  }
}

export default Nothing
