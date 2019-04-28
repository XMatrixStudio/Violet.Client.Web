import React, { Component } from 'react'
import './OrgMember.less'
import TestAvatar from '@/Assets/avatar.jpg'
import MemberCard from './MemberCard'
import { Button, Modal, Input, Icon } from 'antd'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

type ListStatus = 'load' | 'nothing' | 'init' | 'show'

@observer
class OrgMember extends Component {
  @observable showInvite: boolean
  @observable listStatus: ListStatus
  @observable searchValue: string

  searchResult = (
    <>
      <MemberCard
        data={{
          name: '我是秀秀',
          avatar: TestAvatar,
          type: 'add'
        }}
      />
      <MemberCard
        data={{
          name: '我也是秀秀',
          avatar: TestAvatar,
          type: 'add'
        }}
      />
      <MemberCard
        data={{
          name: '我也是秀秀',
          avatar: TestAvatar,
          type: 'add'
        }}
      />
      <MemberCard
        data={{
          name: '我也是秀秀',
          avatar: TestAvatar,
          type: 'add'
        }}
      />
      <MemberCard
        data={{
          name: '我也是秀秀',
          avatar: TestAvatar,
          type: 'add'
        }}
      />
      <MemberCard
        data={{
          name: '我也是秀秀',
          avatar: TestAvatar,
          type: 'add'
        }}
      />
    </>
  )

  searchTimer: NodeJS.Timeout | null

  constructor(props: any) {
    super(props)
    this.showInvite = false
    this.listStatus = 'init'
    this.searchTimer = null
  }

  onSearch = (value: string) => {
    if (this.listStatus !== 'show') {
      this.listStatus = 'load'
    }
    if (value === '') {
      this.listStatus = 'init'
    } else if (value === 'xx') {
      this.listStatus = 'nothing'
    } else {
      // 发送请求
      this.listStatus = 'show'
    }
  }

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
        return this.searchResult
    }
  }

  render() {
    return (
      <div className='org-member'>
        <div className='item-title'>管理员</div>
        <MemberCard
          data={{
            name: 'ZhenlyChen (创建者)',
            avatar: TestAvatar,
            isMe: true,
            type: 'admin'
          }}
        />
        <MemberCard
          data={{
            name: 'MegaShow',
            avatar: TestAvatar,
            type: 'admin'
          }}
        />
        <div className='item-title'>开发者</div>
        <MemberCard
          data={{
            name: 'AA',
            avatar: TestAvatar,
            type: 'dev'
          }}
        />
        <MemberCard
          data={{
            name: 'BB',
            avatar: TestAvatar,
            type: 'dev'
          }}
        />
        <div className='item-title'>待确认</div>
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
        />
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
