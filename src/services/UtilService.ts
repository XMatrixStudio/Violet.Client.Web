import Axios from 'axios'

export default {
  getImageCaptcha: async () => {
    const res = await Axios.get('/api/i/util/captcha')
    return res
  },
  getIPAddress: async (ip: string) => {
    const res = await Axios.get('/ip/?ip=' + ip)
    return res.data
  }
}
