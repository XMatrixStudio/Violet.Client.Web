import React from 'react';
import { Form, FormButton, FormInput } from '@fluentui/react-northstar';
import './Login.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';

function Login() {

  const form = useLocalObservable(() => ({
    account: '',
    password: '',
    update(data: { [k: string]: string }) {
      console.log(data)
      for (let name in data) {
        form[name as 'account' | 'password'] = data[name]
      }
    }
  }))

  const onSubmit = () => {
    console.log(form.account, form.password)
  }

  return (
    <div className="login-layout">
      <p className="title">登录</p>
      <p className="sub-title">输入你的账号密码</p>
      <Form className="my-form login-form"
        onSubmit={onSubmit}>
        <FormInput
          label="用户名 / 邮箱"
          name="account"
          value={form.account}
          onChange={(_, data) => form.update({
            account: data!.value
          })}
          showSuccessIndicator={false}
          required />
        <FormInput
          label="密码"
          name="password"
          type="password"
          value={form.password}
          onChange={(_, data) => form.update({
            password: data!.value
          })}
          showSuccessIndicator={false}
          clearable
          required />
        <FormButton
          className="login-btn"
          content="登录"
          primary />
      </Form>
    </div>
  );
}

export default observer(Login);