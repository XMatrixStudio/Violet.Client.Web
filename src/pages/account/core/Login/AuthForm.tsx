import React, { useEffect } from 'react'
import { useStore } from '@/Store'
import {  useLocalStore } from 'mobx-react-lite'
import {  message } from 'antd'
import UserService from '@/services/UserService'
import { errorHandler, getAuthParams } from '@/components/core/UtilTool'
import useRouter from 'use-react-router'
import { Type } from '@/services/type'


export function useAuthForm() {
  const store = useStore()

  const { location } = useRouter()

  const data = useLocalStore(() => ({
    errorText: '',
    authScopes: ['base'],
    selected: { base: true } as { [key: string]: boolean },
    authTime: 15,
    params: null as Type.AuthParams | null
  }))

  useEffect(() => {
    // 获取授权参数
    data.params = getAuthParams(location.search)
    if (data.params && data.params.valid) {
      data.params.scope.forEach(v => {
        if (['info', 'email'].includes(v) && !data.authScopes.includes(v)) {
          data.authScopes.push(v)
          data.selected[v] = true
        }
      })
    } else {
      data.errorText = '无效参数'
    }
    // eslint-disable-next-line
  }, [])

  const auth = () => {
    UserService.GetAuthByID(store.app!.id, data.params!.redirectUrl)
      .then(res => {
        // 已授权，直接跳转
        window.location.href =
          data.params!.redirectUrl +
          '?code=' +
          res.data.code +
          '&state=' +
          data.params!.state
      })
      .catch(error => {
        errorHandler(error, msg => {
          if (msg === 'error_redirect_url') {
            data.errorText = '非法回调地址'
          } else if (msg === 'not_exist_app') {
            data.errorText = '非法应用信息'
          } else if (msg !== 'not_exist_auth') {
            data.errorText = '获取授权信息失败, ' + msg
          }
        })
        // 未授权
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectScope = []
    for (const s in data.selected) {
      if (data.selected[s] === true) {
        selectScope.push(s)
      }
    }
    UserService.Auth({
      appId: store.app!.id,
      duration: data.authTime,
      scope: selectScope
    })
      .then(auth)
      .catch(error => {
        errorHandler(error, msg => {
          message.error('授权失败, ' + msg)
        })
      })
  }

  const handleSelect = (key: string) => {
    return () => {
      data.selected[key] = !data.selected[key]
    }
  }

  const handleTime = (time: number) => {
    return () => {
      data.authTime = time
    }
  }

  return {
    data,
    store,
    handleSubmit,
    handleSelect,
    handleTime
  }
}
