import * as React from 'react'
import './LoginSide.less'
import logo from '@/assets/logo.svg'
import { Icon } from 'antd';

export interface ILoginSideProps {
}

export function LoginSide(props: ILoginSideProps) {
  return (
    <div className="layout-login-side">
      <div className="top-layout">
        <img src={logo} className="logo" />
        <span className="violet">Violet</span>
      </div>
      <div className="title">
        登陆你的账号
      </div>
      <div className="bottom-layout">
        <p>没有账号？ <a>注册</a></p>
        <p className="help-layout">
          <Icon className="info-icon" type="info-circle" theme="filled" />
          Violet 需要验证你的身份
        </p>


      </div>
    </div>
  );
}
