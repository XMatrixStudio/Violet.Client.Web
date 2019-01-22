import * as React from 'react'

export class Root extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        {this.props.children}
        {this.renderDevTool()}
      </div>
    )
  }

  private renderDevTool() {
    if (process.env.NODE_ENV === 'dev') {
      const DevTools = require('mobx-react-devtools').default
      return <DevTools />
    }
    return null
  }
}
