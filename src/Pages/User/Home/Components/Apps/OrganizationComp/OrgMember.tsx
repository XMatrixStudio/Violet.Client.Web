import React, { Component } from 'react'
import './OrgMember.less'
import MemberCard from './MemberCard'
import { Button, Modal, Input, Icon, Skeleton } from 'antd'
import { observer, inject } from 'mobx-react'
import { observable, action, runInAction } from 'mobx'
import UserStore from 'src/Store/UserStore'
import UserService from 'src/Services/UserService'

type ListStatus = 'load' | 'nothing' | 'init' | 'show'

interface IOrgMemberProps {
  members?: Type.OrgMemberInfoData[]
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class OrgMember extends Component<IOrgMemberProps> {
  @observable showInvite: boolean
  @observable listStatus: ListStatus
  @observable searchResult: Type.UserBaseData[]
  searchTimer: NodeJS.Timeout | null

  @action
  componentWillMount() {
    this.showInvite = false
    this.listStatus = 'init'
    this.searchTimer = null
  }

  @action
  onSearch = (value: string) => {
    if (this.listStatus !== 'show') {
      this.listStatus = 'load'
    }
    if (value === '') {
      this.listStatus = 'init'
    } else {
      if (this.props.members === undefined) {
        return
      }
      // 过滤当前已加入用户
      const currentMember = this.props.members.map(v => v.id)
      UserService.SearchUser(value, 1, 10)
        .then(res => {
          runInAction(() => {
            this.searchResult = []
            for (const m of res.data.data) {
              if (!currentMember.includes(m.id)) {
                this.searchResult.push(m)
              }
            }
            this.listStatus =
              this.searchResult.length === 0 ? 'nothing' : 'show'
          })
        })
        .catch(error => {
          this.listStatus = 'nothing'
        })
      // 发送请求
    }
  }

  @action
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.listStatus !== 'show') {
      this.listStatus = 'load'
    }
    if (this.searchTimer) {
      clearTimeout(this.searchTimer)
    }
    const value = event.target.value
    if (value === '') {
      this.onSearch('')
    } else {
      this.searchTimer = setTimeout(() => {
        this.onSearch(value)
      }, 1000)
    }
  }

  ListContentBox = (status: ListStatus) => {
    switch (status) {
      case 'init':
        return (
          <div className='status-list'>
            <Icon type='search' />
            <p>搜索用户</p>
          </div>
        )
      case 'nothing':
        return (
          <div className='status-list'>
            <Icon type='inbox' />
            <p>找不到相关用户</p>
          </div>
        )

      case 'load':
        return (
          <div className='status-list'>
            <Icon type='loading' />
          </div>
        )

      case 'show':
        return this.searchResult.map(v => {
          return (
            <MemberCard
              key={v.id}
              data={{
                nickname: v.nickname,
                name: v.name,
                avatar: v.avatar,
                type: 'add',
                email: '空',
                phone: '空'
              }}
            />
          )
        })
    }
  }

  render() {
    if (
      this.props.UserStore!.init !== true ||
      this.props.members === undefined
    ) {
      return <Skeleton active={true} />
    }

    const adminList: Type.OrgMemberInfoData[] = []
    const devList: Type.OrgMemberInfoData[] = []
    // const waitList: Type.OrgMemberInfoData[] = []
    for (const m of this.props.members) {
      if (m.role === 0) {
        devList.push(m)
      } else {
        adminList.push(m)
      }
    }
    const AdminMember = adminList.map(v => {
      return (
        <MemberCard
          key={v.id}
          data={{
            name: v.name,
            nickname: v.nickname + (v.role === 2 ? '（创建者）' : ''),
            avatar: v.avatar,
            type: v.role === 2 ? 'own' : 'admin',
            isMe: v.id === this.props.UserStore!.data.id,
            email: '空',
            phone: '空'
          }}
        />
      )
    })
    const DevMember = devList.map(v => {
      return (
        <MemberCard
          key={v.id}
          data={{
            nickname: v.nickname,
            name: v.name,
            avatar: v.avatar,
            type: 'dev',
            isMe: v.id === this.props.UserStore!.data.id,
            email: '空',
            phone: '空'
          }}
        />
      )
    })

    return (
      <div className='org-member'>
        {AdminMember.length !== 0 && <div className='item-title'>管理员</div>}
        {AdminMember}
        {DevMember.length !== 0 && <div className='item-title'>开发者</div>}
        {DevMember}
        {/* <div className='item-title'>待确认</div>
        <MemberCard
          data={{
            name: '我好秀啊',
            avatar: TestAvatar,
            type: 'wait'
          }}
        />
        <MemberCard
          data={{
            name: '楼上太秀了',
            avatar: TestAvatar,
            type: 'wait'
          }}
        /> */}
        <div className='more-member'>
          <Button
            onClick={() => {
              this.showInvite = true
              this.listStatus = 'init'
            }}
            size='large'
            type='primary'
            icon='user-add'
          >
            邀请加入
          </Button>
          <Modal
            visible={this.showInvite}
            onOk={() => {
              this.showInvite = false
              this.listStatus = 'init'
            }}
            onCancel={() => {
              this.showInvite = false
              this.listStatus = 'init'
            }}
            destroyOnClose={true}
            className='model-invite'
            title='邀请加入XMatrix'
            okText='完成'
            cancelText='取消'
          >
            <Input.Search
              onSearch={this.onSearch}
              onChange={this.onChange}
              placeholder='通过用户名、邮箱或手机号搜索用户'
            />
            <div className='user-list'>
              {this.ListContentBox(this.listStatus)}
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default OrgMember
