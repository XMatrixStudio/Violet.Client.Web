import { History, Location } from 'history'

export default {
    GoBackAccount: (history: History, location: Location) => {
        if (history.length > 2 && location.key !== undefined) {
            history.goBack()
        } else {
            history.replace('/account' + history.location.search)
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
        if (
            obj.appId === undefined ||
            obj.redirectUrl === undefined ||
            obj.state === undefined ||
            obj.responseType !== 'code'
        ) {
            valid = false
        }
        const res: Type.AuthParams = {
            responseType: obj.responseType,
            appId: obj.appId,
            quickMode: obj.quickMode === 'true',
            redirectUrl: obj.redirectUrl,
            state: obj.state,
            scope: obj.scope ? obj.scope.split(',') : ['base'],
            valid: valid
        }
        return res
    }
}
