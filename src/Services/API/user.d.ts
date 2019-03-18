declare namespace User {
  namespace GET {
    interface ResponseBody {
      email?: string
      phone?: string
      name: string
      level: number
      createTime: Date
      info: {
        avatar: string
        nickname: string
        bio?: string
        birthday?: Date
        email?: string
        gender?: number
        location?: string
        phone?: string
        url?: string
      }
    }
  }

  namespace POST {
    interface RequestBody {
      name: string
      password: string
      nickname?: string
    }
  }

  namespace PATCH {
    interface RequestBody {
      info?: {
        avatar?: string
        bio?: string
        birthday?: Date | string
        email?: string
        gender?: 0 | 1 | 2
        location?: string
        nickname?: string
        phone?: string
        url?: string
      }
      secure?: {
        old_password: string
        new_password: string
      }
    }
  }
}

declare namespace User.Email {
  namespace POST {
    interface RequestBody {
      operator: 'register' | 'reset' | 'update'
      captcha: string
      email: string
    }
  }

  namespace PUT {
    interface RequestBody {
      operator: 'register' | 'reset' | 'update'
      code: string
      password?: string
    }
  }
}

declare namespace User.Phone {
  namespace POST {
    interface RequestBody {
      operator: 'register' | 'reset' | 'update'
      captcha: string
      phone: string
    }
  }

  namespace PUT {
    interface RequestBody {
      operator: 'register' | 'reset' | 'update'
      code: string
      password?: string
    }
  }
}

declare namespace User.Session {
  namespace POST {
    interface RequestBody {
      user: string
      password: string
      remember?: boolean
    }
  }
}
