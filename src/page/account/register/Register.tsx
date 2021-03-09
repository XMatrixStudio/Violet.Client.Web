import React from 'react';
import { Form, FormButton, FormCheckbox, FormInput } from '@fluentui/react-northstar';
import './Register.scss';

function Register() {

  return (
    <div className="login-layout">
      <p className="title">创建账号</p>
      <p className="sub-title">输入你的账号密码</p>
      <Form className="my-form login-form">
        <FormInput
          label="用户名 / 邮箱"
          name="id"
          required />
        <FormInput
          label="密码"
          name="password"
          type="password"
          clearable
          required />
        <FormCheckbox
          label="记住我" />
        <FormButton
          className="login-btn"
          content="登录"
          primary />
      </Form>
    </div>
  );
}

export default Register;