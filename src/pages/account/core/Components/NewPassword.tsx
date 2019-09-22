/***
 * 密码填充表单
 */
import{ WrappedFormUtils } from 'antd/lib/form/Form'
import { useLocalStore } from 'mobx-react-lite'

export interface INewPasswordProps {
  form: WrappedFormUtils
}

export function useNewPassword(props: INewPasswordProps) {
  const data = useLocalStore(() => ({
    confirmDirty: false
  }))

  const handleConfirmBlur = (e: any) => {
    const value = e.target.value
    data.confirmDirty = data.confirmDirty || !!value
  }

  const compareToFirstPassword = (_: any, value: any, callback: any) => {
    if (value && value !== props.form.getFieldValue('password')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (_: any, value: any, callback: any) => {
    if (!/^[a-zA-Z].*[0-9]|.*[0-9].*[a-zA-Z]/.test(value)) {
      callback('密码不能为纯数字或纯字母')
    } else if (value && data.confirmDirty) {
      props.form.validateFields(['confirm'], { force: true })
      callback()
    } else {
      callback()
    }
  }

  const { getFieldDecorator } = props.form

  return {
    getFieldDecorator,
    handleConfirmBlur,
    compareToFirstPassword,
    validateToNextPassword
  }
}
