import React from 'react';
import { Form, FormButton, FormInput } from '@fluentui/react-northstar';
import './Register.scss';

function Register() {

  return (
    <div className="login-layout">
      <p className="title">创建账号</p>
      <p className="sub-title">输入你的账号密码</p>
      <Form className="my-form login-form">
        <FormInput
          label="邮箱"
          name="email"
          required />
        <FormInput
          label="密码"
          name="password"
          type="password"
          clearable
          required />
        <FormInput
          label="再次输入密码"
          name="password"
          type="password"
          clearable
          required />
        <FormButton
          className="login-btn"
          content="注册"
          primary />
      </Form>
    </div>
  );
}

export default Register;