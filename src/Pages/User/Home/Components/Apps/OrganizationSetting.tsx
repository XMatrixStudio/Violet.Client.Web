import React, { Component } from 'react'
import { Tabs, Icon, message } from 'antd'
import OrgInfo from './OrganizationComp/OrgInfo'
import OrgMember from './OrganizationComp/OrgMember'
import OrgSetting from './OrganizationComp/OrgSetting'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'
import UIStore from 'src/Store/UIStore'
import { observable, runInAction, action } from 'mobx'
import DevService from 'src/Services/DevService'
import ServiceTool from 'src/Services/ServiceTool'

interface IOrganizationSettingProps extends RouteComponentProps<any> {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class OrganizationSetting extends Component<IOrganizationSettingProps> {
  @observable orgInfo?: Type.OrgInfoData
  @observable members?: Type.OrgMemberInfoData[]
  orgName: string

  @action
  componentWillMount() {
    document.title = '组织管理 | Violet'
    this.orgName = this.props.match.params.id
    this.orgInfo = undefined
    DevService.getOrgInfoByName(this.orgName, true)
      .then(res => {
        runInAction(() => {
          this.orgInfo = res.data
          this.props.UIStore!.setTitle(
            '组织: ' + this.orgInfo.info.displayName,
            '在这里管理你的组织'
          )
          this.props.UIStore!.setBack('/user/apps?t=' + this.orgName)
        })
        this.loadMember()
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('无法加载组织信息')
          this.props.history.replace('/user/apps')
        })
      })
  }

  @action
  loadMember() {
    if (this.orgInfo === undefined) {
      return
    }
    DevService.getOrgMembers(this.orgInfo.id, 1, this.orgInfo.dev.memberOwn)
      .then(res => {
        runInAction(() => {
          this.members = res.data.data
        })
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('无法加载成员信息')
        })
      })
  }

  render() {
    return (
      <div className='org-setting'>
        <Tabs>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='info' />
                组织信息
              </span>
            }
            key='info'
          >
            <OrgInfo data={this.orgInfo} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='team' />
                成员管理
              </span>
            }
            key='member'
          >
            <OrgMember members={this.members} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='setting' />
                组织设置
              </span>
            }
            key='setting'
          >
            <OrgSetting />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(OrganizationSetting)
