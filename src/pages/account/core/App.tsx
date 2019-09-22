import { autorun } from 'mobx'
import useRouter from 'use-react-router'
import UserService from '@/services/UserService'
import { getAuthParams, errorHandler } from '@/components/core/UtilTool'
import DevService from '@/services/DevService'
import { useLocalStore } from 'mobx-react-lite'
import { createStore } from '@/Store'
import { useEffect } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export function useApp() {
  // 创建全局 Store
  const store = useLocalStore(createStore)

  const { history, location } = useRouter()

  useEffect(() => {
    // 获取用户信息
    UserService.fetchUserInfo(store).then(res => {
      if (res === null && location.pathname.includes('/account/auth')) {
        // 未登录跳转到登陆界面
        history.push('/account' + location.search)
      } else if (res !== null && location.pathname === '/account') {
        // 已登录用户进行自动登陆
        history.push('/account/auth' + location.search)
      }
    })
    // 获取授权应用信息
    store.app = null
    const params = getAuthParams(location.search)
    if (params.valid) {
      DevService.getAppInfoById(params.appId)
        .then(res => {
          store.app = res.data
        })
        .catch(error => {
          errorHandler(error, msg => {
            history.push('/account/auth')
          })
        })
    }
    // 自动保存状态
    autorun(() => {
      console.log('save')
      localStorage.setItem('violet_store', JSON.stringify(store))
    })
    // 设置标题
    document.title = 'Violet'
    // eslint-disable-next-line
  }, [])

  return {
    store,
    location
  }
}
