// 获取 Get 参数
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { message } from 'antd'
import { Type } from '@/services/type'

export function getQuery(url: string, key: string) {
  return new URLSearchParams(url).get(key) || ''
}

// 获取授权参数
export function getAuthParams(url: string) {
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

// 设置表单
export function setError(
  form: WrappedFormUtils,
  name: string,
  error?: string,
  value?: string
) {
  if (value === undefined) {
    value = form.getFieldValue(name)
  }
  const obj = {
    [name]: {
      value: value,
      errors: [] as Error[]
    }
  }
  if (error) {
    obj[name].errors.push(new Error(error))
  }
  form.setFields(obj)
}

export function errorHandler(error: any, handler: (msg: string) => void) {
  if (error && error.response && error.response.data) {
    switch (error.response.data.error) {
      case 'invalid_token':
        message.error('请先登陆')
        // TODO 跳转到登陆界面
        break
      case 'timeout_token':
        message.error('登陆已过期')
        // TODO 跳转到登陆界面
        break
      case 'permission_deny':
        message.error('权限不足')
        break
      case 'ban_user':
        message.error('当前账号异常，无法进行操作')
        break
      default:
        handler(error.response.data.error)
    }
  } else {
    handler('未知错误')
  }
}
