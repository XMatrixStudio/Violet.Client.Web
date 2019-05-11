import { History, Location } from 'history'

export default {
  GoBackAccount: (history: History, location: Location) => {
    if (history.length > 2 && location.key !== undefined) {
      history.goBack()
    } else {
      history.replace('/account')
    }
  },
  getParams(url: string) {
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj: { [propName: string]: string } = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      obj[decodeURIComponent($1)] = String(decodeURIComponent($2))
      return rs
    })
    let valid = true
    if (!['code', 'code_post'].includes(obj.response_type)) {
      valid = false
    } else if (
      obj.client_id === undefined ||
      obj.redirect_url === undefined ||
      obj.state === undefined
    ) {
      valid = false
    }
    const res: Type.AuthParams = {
      response_type: obj.response_type,
      client_id: obj.client_id,
      quick_mode: obj.quick_mode === 'true',
      redirect_url: obj.redirect_url,
      state: obj.state,
      scope: obj.scope ? obj.scope.split(',') : ['base'],
      valid: valid
    }
    return res
  }
}
