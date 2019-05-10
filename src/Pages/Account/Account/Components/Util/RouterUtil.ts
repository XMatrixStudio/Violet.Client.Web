import { History, Location } from 'history'

interface IAuthParams {
  client_id?: string
  quick_mode?: string
  redirect_url?: string
  state?: string
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
    const obj: IAuthParams = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      obj[decodeURIComponent($1)] = String(decodeURIComponent($2))
      return rs
    })
    return obj
  }
}
