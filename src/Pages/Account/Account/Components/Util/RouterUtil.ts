import { History, Location } from 'history'

interface IAuthParams {
  client_id: string
  quick_mode: boolean
  redirect_url: string
  state: string
  scope: string[]
}

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
    const res: IAuthParams = {
      client_id: obj.client_id,
      quick_mode: obj.quick_mode === 'true',
      redirect_url: obj.redirect_url,
      state: obj.state,
      scope: obj.scope ? obj.scope.split(',') : ['base']
    }
    return res
  }
}
