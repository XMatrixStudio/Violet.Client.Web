import { WrappedFormUtils } from 'antd/lib/form/Form'
import useRouter from 'use-react-router'
import { useLocalStore } from 'mobx-react-lite'

export interface IFeedbackFormProps {
  form: WrappedFormUtils
}

export function useFeedbackForm(props: IFeedbackFormProps) {
  const router = useRouter()

  const data = useLocalStore(() => ({
    finish: false
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // TODO 发送反馈
        data.finish = true
      }
    })
  }

  const handleBack = () => {
    router.history.replace('/account/reset' + router.location.search)
  }

  return {
    data,
    handleSubmit,
    handleBack
  }
}
