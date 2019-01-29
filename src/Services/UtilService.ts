import Axios from 'axios'

export default {
  getImageCaptcha: async () => {
    const res = await Axios.get('/api/i/util/captcha')
    return res.data
  }
}
