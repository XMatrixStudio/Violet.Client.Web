const state = {
  language: 'zh',
  data: {
    zh: {
      label: '简体中文',
      Notice: {
        failed: '发生错误',
        error: {
          unknown: '未知错误，请联系管理员，错误参数：',
          server: '无法连接到服务器，请稍后重试.',
          logTimeout: '登陆已过时，请重新登陆.'
        }
      },
      User: {
        home: '我的主页',
        setting: '用户设置',
        website: '授权管理',
        dev: '应用管理',
        logout: '退出登陆',
        modal: {
          title: '退出确认',
          content: '是否退出登陆？',
          button: '退出'
        },
        avatar: '更新你的照片'
      },
      Upload: {
        hint: '点击，或拖动图片至此处！',
        loading: '正在上传……',
        noSupported: '浏览器不支持该功能，请使用IE10以上或其他现代浏览器！',
        success: '上传成功',
        fail: '图片上传失败',
        preview: '头像预览',
        btn: {
          off: '取消',
          close: '关闭',
          back: '上一步',
          save: '保存'
        },
        error: {
          onlyImg: '仅限图片格式',
          outOfSize: '单文件大小不能超过 ',
          lowestPx: '图片最低像素为（宽*高）：'
        }
      },
      UserInfo: {
        email: '邮箱',
        url: '个人主页',
        phone: '手机号码',
        location: '位置',
        locationInput: '你所在的城市',
        birthDate: '生日',
        bio: '个人简介',
        className: ['Violet用户', '开发者', '管理员', '最高管理员', '神秘用户'],
        switchOn: '公开',
        switchOff: '私密',
        gender: {
          label: '性别',
          man: '男',
          woman: '女',
          other: '其他'
        },
        edit: '编辑个人资料',
        submit: '确认修改',
        success: '修改成功',
        invalid: '无效的格式',
        error: '错误： ',
        overflow: '不能超过%d个字符'
      },
      Login: {
        error: '用户名或密码错误，请重新输入',
        nullUser: '请填写用户名或邮箱',
        nullPass: '请填写密码',
        userHelp: '用户名 / 邮箱',
        passHelp: '密码',
        login: '登陆',
        auto: '记住登陆状态',
        forget: '忘记密码？',
        noAccount: '还没有账号？',
        register: '注册一个'
      },
      Register: {
        title: '使用邮箱注册',
        button: '注册',
        hadAccount: '已有账号',
        login: '立刻登陆',
        success: '注册成功',
        error: '注册失败'
      },
      Auth: {
        Hi: 'Hi',
        confirm: '是否授权登陆到',
        auth: '授权',
        cancel: '取消',
        change: '切换账号'
      },
      Reset: {
        title: '找回密码',
        button: '重置密码',
        remember: '记起来了？',
        login: '立即登陆',
        success: '修改密码成功，请重新登陆',
        fail: '找回密码失败'
      },
      Verify: {
        title: '认证你的邮箱',
        button: '认证邮箱',
        change: '切换账号',
        success: '邮箱验证成功',
        fail: '邮箱验证失败',
        toLogin: '请先登陆'
      },
      Form: {
        register: '注册',
        login: '登陆',
        email: '邮箱',
        userName: '用户名',
        password: '密码',
        passwordCheck: '确认密码',
        vCode: '验证码',
        emailCode: '邮箱验证码',
        getVCode: '获取验证码',
        againGetVCode: '重新获取',
        sentEmailCode: '验证码已发送到你的邮箱',
        nullName: '请输入用户名',
        invalidName: '用户名以字母开头，包含字母数字下划线，1-32位',
        nullPass: '请输入密码',
        lessPass: '密码不能小于6位',
        largePass: '密码不能大于128位',
        invalidPassword: '无效密码',
        invalidPass: '密码不允许为纯数字',
        againPass: '请再次输入密码',
        errorPass: '两次输入密码不一致',
        nullEmail: '邮箱不能为空',
        invalidEmail: '请输入有效的邮箱',
        limitTime: '你的请求太频繁了，请过一会儿再请求',
        nullVCode: '验证码不能为空',
        timeoutEmailCode: '邮箱验证码已失效，请重新获取',
        errorEmailCode: '邮箱验证码错误',
        invalid: '无法通过验证',
        errorVCode: '验证码错误',
        noExistEmail: '邮箱不存在',
        existEmail: '该邮箱已注册，请尝试登陆',
        existName: '该用户名已存在',
        reservedName: '该用户名被系统保留',
        otherError: '未知错误，请联系管理员，错误参数',
        failVCode: '获取验证码失败, 请稍后重试'
      },
      AuthList: {
        title: '授权管理',
        none: '当前没有授权过的网站',
        authLogin: '授权登陆',
        cancelAuth: '取消授权',
        confirmTitle: '取消授权确认',
        confirm: '是否取消对以下应用授权',
        sure: '确认',
        cancel: '取消',
        lastLogin: '最后一次登陆'
      },
      Dev: {
        title: '应用管理',
        none: '当前账号没有应用',
        add: '新增应用',
        content: '当前账号应用数',
        content2: '是否新增应用',
        fail: '新增失败',
        failContent: '应用数量已达当前账户上限',
        sure: '确认',
        cancel: '取消',
        detail: '查看详情'
      },
      DevDetail: {
        title: '应用详情',
        id: 'ID',
        key: 'Key',
        sure: '确认',
        cancel: '取消',
        keyHelp: '建议定时更改保证安全',
        change: '更换',
        name: '应用名称',
        nameHelp: '应用名称是你应用最直观的展示',
        url: '应用主页',
        urlHelp: '应用的主页',
        callBack: '回调地址',
        callBackHelp: '登陆后Code返回的地址，你需要设置接受他的页面',
        detail: '应用简介',
        detailHelp: '在用户登陆时展示',
        help: 'API文档',
        submit: '修改信息',
        delete: '删除应用',
        nullName: '应用名不能为空',
        nullUrl: '主页不能为空',
        nullCallBack: '回调地址不能为空',
        nullDetail: '应用简介不能为空',
        lengthLimit: '长度需要在%1d - %2d之间',
        keyTitle: '更改Key确认',
        keyContent1: '更改Key之后会导致当前服务立刻失效',
        keyContent2: '需要重新部署服务才能使用服务',
        keySuccess: '修改Key成功',
        invalidId: '无效的应用ID',
        setSuccess: '修改信息成功',
        deleteTitle: '删除应用确认',
        deleteContent1: '是否删除应用',
        deleteContent2: '删除之后将不可恢复',
        deleteSuccess: '删除应用成功',
        iconSuccess: '修改图标成功',
        icon: '更改图标',
        invalidQuery: '参数错误',
        clickToCopy: '点击复制',
        copySuccess: '复制成功',
        copyFail: '复制失败',
        backToList: '返回列表'
      },
      Index: {
        welcome: '你即将登陆到',
        violet: '不，我想登陆到Violet',
        errorClientId: '无效的连接，将登陆到Violet用户系统',
        errorOther: '未知错误， 错误参数',
        name: 'Violet User System',
        detail: 'Violet 中央授权系统',
        invalidQuery: '参数错误'
      }
    },
    zhs: {
      label: '繁體中文',
      Notice: {
        failed: '發生錯誤',
        error: {
          unknown: '未知錯誤，請聯系管理員，錯誤參數：',
          server: '無法連接到服務器，請稍後重試.',
          logTimeout: '登陸已過時，請重新登陸.'
        }
      },
      User: {
        home: '我的主頁',
        setting: '用戶設置',
        website: '授權管理',
        dev: '應用管理',
        logout: '退出登陸',
        modal: {
          title: '退出確認',
          content: '是否退出登陸？',
          button: '退出'
        },
        avatar: '更新你的照片'
      },
      Upload: {
        hint: '點擊，或拖動圖片至此處！',
        loading: '正在上傳……',
        noSupported: '瀏覽器不支持該功能，請使用IE10以上或其他現代瀏覽器！',
        success: '上傳成功',
        fail: '圖片上傳失敗',
        preview: '頭像預覽',
        btn: {
          off: '取消',
          close: '關閉',
          back: '上一步',
          save: '保存'
        },
        error: {
          onlyImg: '僅限圖片格式',
          outOfSize: '單文件大小不能超過 ',
          lowestPx: '圖片最低像素為（寬*高）：'
        }
      },
      UserInfo: {
        email: '郵箱',
        url: '個人主頁',
        phone: '手機號碼',
        location: '位置',
        locationInput: '你所在的城市',
        birthDate: '生日',
        bio: '個人簡介',
        className: ['Violet用戶', '開發者', '管理員', '最高管理員', '神秘用戶'],
        switchOn: '公開',
        switchOff: '私密',
        gender: {
          label: '性別',
          man: '男',
          woman: '女',
          other: '其他'
        },
        edit: '編輯個人資料',
        submit: '確認修改',
        success: '修改成功',
        invalid: '無效的格式',
        error: '錯誤： ',
        overflow: '不能超過%d個字符'
      },
      Login: {
        error: '用戶名或密碼錯誤，請重新輸入',
        nullUser: '請填寫用戶名或郵箱',
        nullPass: '請填寫密碼',
        userHelp: '用戶名 / 郵箱',
        passHelp: '密碼',
        login: '登陸',
        auto: '記住登陸狀態',
        forget: '忘記密碼？',
        noAccount: '還沒有賬號？',
        register: '註冊一個'
      },
      Register: {
        title: '使用郵箱註冊',
        button: '註冊',
        hadAccount: '已有賬號',
        login: '立刻登陸',
        success: '註冊成功',
        error: '註冊失敗'
      },
      Auth: {
        Hi: 'Hi',
        confirm: '是否授權登陸到',
        auth: '授權',
        cancel: '取消',
        change: '切換賬號'
      },
      Reset: {
        title: '找回密碼',
        button: '重置密碼',
        remember: '記起來了？',
        login: '立即登陸',
        success: '修改密碼成功，請重新登陸',
        fail: '找回密碼失敗'
      },
      Verify: {
        title: '認證你的郵箱',
        button: '認證郵箱',
        change: '切換賬號',
        success: '郵箱驗證成功',
        fail: '郵箱驗證失敗',
        toLogin: '請先登陸'
      },
      Form: {
        register: '註冊',
        login: '登陸',
        email: '郵箱',
        userName: '用戶名',
        password: '密碼',
        passwordCheck: '確認密碼',
        vCode: '驗證碼',
        emailCode: '郵箱驗證碼',
        getVCode: '獲取驗證碼',
        againGetVCode: '重新獲取',
        sentEmailCode: '驗證碼已發送到你的郵箱',
        nullName: '請輸入用戶名',
        invalidName: '用戶名以字母開頭，包含字母數字下劃線，1-32位',
        nullPass: '請輸入密碼',
        lessPass: '密碼不能小於6位',
        largePass: '密碼不能大於128位',
        invalidPassword: '無效密碼',
        invalidPass: '密碼不允許為純數字',
        againPass: '請再次輸入密碼',
        errorPass: '兩次輸入密碼不一致',
        nullEmail: '郵箱不能為空',
        invalidEmail: '請輸入有效的郵箱',
        limitTime: '你的請求太頻繁了，請過一會兒再請求',
        nullVCode: '驗證碼不能為空',
        timeoutEmailCode: '郵箱驗證碼已失效，請重新獲取',
        errorEmailCode: '郵箱驗證碼錯誤',
        invalid: '無法通過驗證',
        errorVCode: '驗證碼錯誤',
        noExistEmail: '郵箱不存在',
        existEmail: '該郵箱已註冊，請嘗試登陸',
        existName: '該用戶名已存在',
        reservedName: '該用戶名被系統保留',
        otherError: '未知錯誤，請聯系管理員，錯誤參數',
        failVCode: '獲取驗證碼失敗, 請稍後重試'
      },
      AuthList: {
        title: '授權管理',
        none: '當前沒有授權過的網站',
        authLogin: '授權登陸',
        cancelAuth: '取消授權',
        confirmTitle: '取消授權確認',
        confirm: '是否取消對以下應用授權',
        sure: '確認',
        cancel: '取消',
        lastLogin: '最後一次登陸'
      },
      Dev: {
        title: '應用管理',
        none: '當前賬號沒有應用',
        add: '新增應用',
        content: '當前賬號應用數',
        content2: '是否新增應用',
        fail: '新增失敗',
        failContent: '應用數量已達當前賬戶上限',
        sure: '確認',
        cancel: '取消',
        detail: '查看詳情'
      },
      DevDetail: {
        title: '應用詳情',
        id: 'ID',
        key: 'Key',
        sure: '確認',
        cancel: '取消',
        keyHelp: '建議定時更改保證安全',
        change: '更換',
        name: '應用名稱',
        nameHelp: '應用名稱是你應用最直觀的展示',
        url: '應用主頁',
        urlHelp: '應用的主頁',
        callBack: '回調地址',
        callBackHelp: '登陸後Code返回的地址，你需要設置接受他的頁面',
        detail: '應用簡介',
        detailHelp: '在用戶登陸時展示',
        help: 'API文檔',
        submit: '修改信息',
        delete: '刪除應用',
        nullName: '應用名不能為空',
        nullUrl: '主頁不能為空',
        nullCallBack: '回調地址不能為空',
        nullDetail: '應用簡介不能為空',
        lengthLimit: '長度需要在%1d - %2d之間',
        keyTitle: '更改Key確認',
        keyContent1: '更改Key之後會導致當前服務立刻失效',
        keyContent2: '需要重新部署服務才能使用服務',
        keySuccess: '修改Key成功',
        invalidId: '無效的應用ID',
        setSuccess: '修改信息成功',
        deleteTitle: '刪除應用確認',
        deleteContent1: '是否刪除應用',
        deleteContent2: '刪除之後將不可恢復',
        deleteSuccess: '刪除應用成功',
        iconSuccess: '修改圖標成功',
        icon: '更改圖標',
        invalidQuery: '參數錯誤',
        clickToCopy: '點擊複製',
        copySuccess: '複製成功',
        copyFail: '複製失敗',
        backToList: '返回列表'
      },
      Index: {
        welcome: '你即將登陸到',
        violet: '不，我想登陸到Violet',
        errorClientId: '無效的連接，將登陸到Violet用戶系統',
        errorOther: '未知錯誤， 錯誤參數',
        name: 'Violet User System',
        detail: 'Violet 中央授權系統',
        invalidQuery: '參數錯誤'
      }
    },
    en: {
      label: 'English',
      Notice: {
        failed: 'An error occurred.',
        error: {
          unknown: 'Unknown error. Please contact with the administrator. Error parameter: ',
          server: 'Unable to connect to the server, please try again later.',
          logTimeout: 'Login is out of date. Please login again.'
        }
      },
      User: {
        home: 'Homepage',
        setting: 'Settings',
        website: 'Authorizations',
        dev: 'App Management',
        logout: 'Logout',
        modal: {
          title: 'Confirm',
          content: 'Do you really want to logout?',
          button: 'Logout'
        },
        avatar: 'Update your avatar'
      },
      Upload: {
        hint: 'Click or drag the file here to upload',
        loading: 'Uploading...',
        noSupported: 'Browser is not supported, please use IE10+ or other browsers',
        success: 'Upload success',
        fail: 'Upload failed',
        preview: 'Preview',
        btn: {
          off: 'Cancel',
          close: 'Close',
          back: 'Back',
          save: 'Save'
        },
        error: {
          onlyImg: 'Image only',
          outOfSize: 'Image exceeds size limit: ',
          lowestPx: 'Image\'s size is too low. Expected at least: '
        }
      },
      UserInfo: {
        email: 'Email',
        url: 'URL',
        phone: 'Phone',
        location: 'Location',
        locationInput: 'The city you live in',
        birthDate: 'Birthday',
        bio: 'Bio',
        className: ['Violet User', 'Developer', 'Administrator', 'Super Administrator', 'Mysterious User'],
        switchOn: 'Public',
        switchOff: 'Private',
        gender: {
          label: 'Gender',
          man: 'Male',
          woman: 'Female',
          other: 'Other'
        },
        edit: 'Edit your profile',
        submit: 'Confirm edit',
        success: 'Update success',
        invalid: 'Invalid format',
        error: 'Error: ',
        overflow: 'No more than %d characters'
      },
      Login: {
        error: 'Incorrect username or password, please input again',
        nullUser: 'Please input your username or email',
        nullPass: 'Please input your password',
        userHelp: 'Your username / email',
        passHelp: 'Your password',
        login: 'Login',
        auto: 'Remember me',
        forget: 'Forgot password?',
        noAccount: 'No account?',
        register: 'Register'
      },
      Register: {
        title: 'Use email to register',
        button: 'Register',
        hadAccount: 'Having an account',
        login: 'Login now',
        success: 'Register success',
        error: 'Register fail'
      },
      Auth: {
        Hi: 'Hi',
        confirm: 'Authorize for ',
        auth: 'Authorize',
        cancel: 'Cancel',
        change: 'Change account'
      },
      Reset: {
        title: 'Get back your password',
        button: 'Reset your password',
        remember: 'Remembered?',
        login: 'Login now',
        success: 'Reset password success, please login again',
        fail: 'Reset password fail'
      },
      Verify: {
        title: 'Check your email',
        button: 'Check email',
        change: 'Change account',
        success: 'Check email success',
        fail: 'Check email fail',
        toLogin: 'Please login'
      },
      Form: {
        register: 'Register',
        login: 'Login',
        email: 'Email',
        userName: 'Username',
        password: 'Password',
        passwordCheck: 'Confirm password',
        vCode: 'Verification code',
        emailCode: 'Email verification code',
        getVCode: 'Get verification code',
        againGetVCode: 'Get code again',
        sentEmailCode: 'The code has been sent to your email',
        nullName: 'Please input your username',
        invalidName: 'Username begins with a letter, including letter, number and underline (maximum is 32 characters)',
        nullPass: 'Please input your password',
        lessPass: 'Password can\'t be less than 6 characters',
        largePass: 'Password can\'t be greater than 128 characters',
        invalidPassword: 'Invalid password',
        invalidPass: 'Password can\'t only include number',
        againPass: 'Please input your password again',
        errorPass: 'Inconsistent passwords',
        nullEmail: 'Email can\'t be empty',
        invalidEmail: 'Invalid email',
        limitTime: 'Frequent request, please request later',
        nullVCode: 'Verification code can\'t be empty',
        timeoutEmailCode: 'Email verification code fails, please get it again',
        errorEmailCode: 'Error email verification code',
        invalid: 'Unable to check',
        errorVCode: 'Error verification code',
        noExistEmail: 'Email doesn\'t exist',
        existEmail: 'This email has been used to register, please try to login',
        existName: 'Username exists',
        reservedName: 'Username is reserved by system',
        otherError: 'Unknown error. Please contact with the administrator. Error parameter: ',
        failVCode: 'Get verification code fail, please get it later'
      },
      AuthList: {
        title: 'Authorized management',
        none: 'There is no website authorized',
        authLogin: 'Authorize to login',
        cancelAuth: 'Remove the authorization',
        confirmTitle: 'Confirm to remove the authorization',
        confirm: 'Do you really want to remove the authorization?',
        sure: 'Confirm',
        cancel: 'Cancel',
        lastLogin: 'Last login time'
      },
      Dev: {
        title: 'App management',
        none: 'There is no application of thee current account',
        add: 'Create application',
        content: 'The number of applications: ',
        content2: 'Do you want to create application?',
        fail: 'Create application fail',
        failContent: 'The number of applications has reached the limit of the current account',
        sure: 'Confirm',
        cancel: 'Cancel',
        detail: 'View the details'
      },
      DevDetail: {
        title: 'APP details',
        id: 'ID',
        key: 'Key',
        sure: 'Confirm',
        cancel: 'Cancel',
        keyHelp: 'Suggest to change at regular time to ensure safety',
        change: 'Change',
        name: 'APP name',
        nameHelp: 'The application name is the most intuitive display of your application.',
        url: 'APP URL',
        urlHelp: 'The homepage of application',
        callBack: 'Callback URL',
        callBackHelp: '登陆后Code返回的地址，你需要设置接受他的页面',
        detail: 'APP introduction',
        detailHelp: 'Display at the user\'s loading',
        help: 'API documents',
        submit: 'Edit information',
        delete: 'Delete APP',
        nullName: 'Application name can\'t be empty',
        nullUrl: 'Application URL can\'t be empty',
        nullCallBack: 'Callback URL can\'t be empty',
        nullDetail: 'Application introduction can\'t be empty',
        lengthLimit: 'Length between %1d - %2d',
        keyTitle: 'Confirm the change of key',
        keyContent1: 'Changing key will cause immediate failure of the current service',
        keyContent2: 'The service needs to be redeployed to use the service',
        keySuccess: 'Change key success',
        invalidId: 'Invalid application ID',
        setSuccess: 'Edit information success',
        deleteTitle: 'Confirm the deletion of application',
        deleteContent1: 'Do you really want to delete the application?',
        deleteContent2: 'It will not be restored after deleting.',
        deleteSuccess: 'Delete application success',
        iconSuccess: 'Update icon success',
        icon: 'Change icon',
        invalidQuery: 'Error parameter',
        clickToCopy: 'Click to copy',
        copySuccess: 'Copied',
        copyFail: 'Copy failed!',
        backToList: 'Back to list'
      },
      Index: {
        welcome: 'You are login to ',
        violet: 'No, I want to login to Violet',
        errorClientId: 'Invalid url, you will login to Violet User System.',
        errorOther: 'Unknown error, error parameter',
        name: 'Violet User System',
        detail: 'Violet Central Authorization System',
        invalidQuery: 'Error parameter'
      }
    }
  }
}

const getters = {
  language () {
    return state.data[state.language]
  }
}

const actions = {

}

const mutations = {
  setLanguage (state, data) {
    state.language = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
