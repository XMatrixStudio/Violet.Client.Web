import React, { Component } from 'react'
import './Apps.less'
import { Icon, Button } from 'antd'
import DeveloperForm from './Form/DeveloperForm'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import AppManger from './AppManger'
import NewAppForm from './Form/NewAppForm'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Action, Location } from 'history'
import OrganizationSetting from './OrganizationSetting'
import AppDetail from './AppDetail'

interface IAppsProps extends RouteComponentProps<any> {}

@observer
class Apps extends Component<IAppsProps> {
  lastPathName: string
  lastSearch: string
  @observable title: string
  @observable subTitle: string

  constructor(props: IAppsProps) {
    super(props)
    this.updateTitle(this.props.location.pathname)
    this.lastSearch = ''
  }

  updateTitle = (pathName: string) => {
    if (pathName.indexOf('/user/apps/org') !== -1) {
      pathName = '/user/apps/org'
    }
    if (pathName.indexOf('/user/apps/detail') !== -1) {
      pathName = '/user/apps/detail'
    }
    switch (pathName) {
      case '/user/apps/not':
        this.title = ''
        this.subTitle = '成为开发者即可创建你的应用'
        break
      case '/user/apps/up/developer':
        this.title = ' > 开发者申请'
        this.subTitle = '请填写您的联系方式(内部使用), 方便我们与您进行联系'
        break
      case '/user/apps/up/admin':
        this.title = ' > 管理员申请'
        this.subTitle = '系统管理员仅允许内部人员申请'
        break
      case '/user/apps/up/more':
        this.title = ' > 应用数申请'
        this.subTitle = '请填写您的应用需求, 便于管理员审核'
        break
      case '/user/apps/up/edit':
        this.title = ' > 修改信息'
        this.subTitle = '请填写新的联系方式(内部使用), 方便我们与您进行联系'
        break
      case '/user/apps/new':
        this.title = ' > 新建应用'
        this.subTitle = '创建新的应用'
        break
      case '/user/apps/org':
        this.title = ' > 组织'
        this.subTitle = '管理你的组织'
        break
      case '/user/apps/detail':
        this.title = ' > 详情'
        this.subTitle = '管理你的应用'
        break

      default:
        this.title = ''
        this.subTitle = '创建并管理你的应用'
    }
  }

  componentWillMount() {
    document.title = '应用管理 | Violet'
  }

  componentDidMount() {
    // if (this.props.location.pathname === '/user/apps') {
    //   this.props.history.replace('/user/apps/not')
    // }
    this.props.history.listen((location: Location, action: Action) => {
      if (this.lastPathName !== location.pathname) {
        this.lastPathName = location.pathname
        this.updateTitle(this.lastPathName)
      }
      if (location.pathname === '/user/apps' && location.search !== '') {
        this.lastSearch = location.search
      }
    })
  }

  render() {
    return (
      <div className='apps-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>
              <a
                className='home-link'
                onClick={() => {
                  const pathName = this.props.location.pathname
                  console.log(this.props.history)
                  if (pathName !== '/user/apps') {
                    if (this.lastSearch !== '') {
                      this.props.history.replace('/user/apps' + this.lastSearch)
                    } else if (pathName.indexOf('/user/apps/org') !== -1) {
                      this.props.history.replace(
                        '/user/apps?t=' +
                          pathName.substr('/user/apps/org'.length + 1)
                      )
                    } else {
                      this.props.history.replace('/user/apps')
                    }
                  }
                }}
              >
                应用管理
              </a>{' '}
              {this.title}
            </p>
            <p className='sub-title'>{this.subTitle}</p>
          </div>
          <div className='right-text' />
        </div>
        <div className='apps-manger'>
          <TransitionGroup style={{ height: '100vh' }}>
            <CSSTransition
              key={this.props.location.pathname.replace('/user/apps', '')}
              classNames='fade'
              exit={false}
              timeout={300}
            >
              <Switch>
                <Route path='/user/apps/not'>
                  <div className='not-dev'>
                    <p className='oops-icon'>
                      <Icon
                        type='frown'
                        theme='twoTone'
                        twoToneColor='#7ce0de'
                      />
                    </p>
                    <p>你当前还不是开发者，快点申请成为开发者吧</p>
                    <Button
                      type='primary'
                      onClick={() => {
                        this.props.history.push('/user/apps/up/developer')
                      }}
                    >
                      成为一名开发者
                    </Button>
                  </div>
                </Route>
                <Route path='/user/apps/up/:type'>
                  <DeveloperForm
                    next={isSubmit => {
                      this.props.history.goBack()
                    }}
                  />
                </Route>
                <Route path='/user/apps/new'>
                  <NewAppForm
                    next={isSubmit => {
                      this.props.history.goBack()
                    }}
                  />
                </Route>
                <Route path='/user/apps/detail/:id' component={AppDetail} />
                <Route
                  path='/user/apps/org/:id'
                  component={OrganizationSetting}
                />
                <Route path='/user/apps' component={AppManger} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default Apps
