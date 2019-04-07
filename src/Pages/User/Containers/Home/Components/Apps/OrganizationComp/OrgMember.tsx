import React, { Component } from 'react'
import './OrgMember.less'
import TestAvatar from '@/Assets/avatar.jpg'
import MemberCard from './MemberCard'
import { Button } from 'antd'

class OrgMember extends Component {
  render() {
    return (
      <div className='org-member'>
        <div className='item-title'>创建者</div>
        <MemberCard
          data={{
            name: 'ZhenlyChen',
            avatar: TestAvatar,
            canChange: false
          }}
        />
        <div className='item-title'>管理员</div>

        <MemberCard
          data={{
            name: 'MegaShow',
            avatar: TestAvatar,
            canChange: true,
            canUp: false,
            canChat: true
          }}
        />
        <div className='item-title'>开发者</div>
        <MemberCard
          data={{
            name: 'AA',
            avatar: TestAvatar,
            canChange: true,
            canUp: true,
            canChat: true
          }}
        />
        <MemberCard
          data={{
            name: 'BB',
            avatar: TestAvatar,
            canChange: true,
            canUp: true,
            canChat: true
          }}
        />
        <div className='more-member'>
          <Button size='large' type='primary' icon='user-add'>
            邀请加入
          </Button>
        </div>
      </div>
    )
  }
}

export default OrgMember
