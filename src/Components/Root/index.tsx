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
    if (true) {
      const DevTools = require('mobx-react-devtools').default
      return <DevTools />
    }
    return null
  }
}
