import Request from '../lib/Request'

const UtilService = {
  getImageCaptcha: async () => {
    const res = await Request.get('/api/i/util/captcha')
    return res
  },
  getIPAddress: async (ip: string) => {
    const res = await Request.get('/ip/?ip=' + ip)
    return res.data
  }
}

export default UtilService
