import React, { Component } from 'react'
import { Form } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

class InfoForm extends Component<{ form: WrappedFormUtils }, any> {
  render() {
    return <div />
  }
}

export default Form.create()(InfoForm)
