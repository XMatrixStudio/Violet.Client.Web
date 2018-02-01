const state = {
  language: 'zh',
  data: {
    zh: {
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
        website: '授权网站',
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
        title: '授权网站',
        none: '当前没有授权过的网站',
        authLogin: '授权登陆',
        cancelAuth: '取消授权',
        confirmTitle: '取消授权确认',
        confirm: '是否取消对以下应用授权',
        sure: '确认',
        cancel: '取消'
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
        invalidQuery: '参数错误'
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
    en: {
      Notice: {
        failed: 'An error occured.',
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
        invalidName: 'Username begins with a letter, including letter, number and underline (maximun is 32 characters)',
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
        title: 'Authorized website',
        none: 'There is no websit authorized',
        authLogin: 'Authorize to login',
        cancelAuth: 'Remove the authorization',
        confirmTitle: 'Confirm to remove the authorization',
        confirm: 'Do you really want to remove the authorization?',
        sure: 'Confirm',
        cancel: 'Cancel'
      },
      Dev: {
        title: 'App management',
        none: 'There is no application of thee current account',
        add: 'Create application',
        content: 'The number of applications: ',
        content2: 'Do you want to create application?',
        fail: 'Create application fail',
        failContent: 'The number of applications has reahced the limit of the current account',
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
        detailHelp: 'Display at the user\'s loginning',
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
        invalidQuery: 'Error parameter'
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