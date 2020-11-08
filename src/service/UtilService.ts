import service from './Service'

const UtilService = {
  getImageCaptcha: async () => {
    const res = await service.get('/api/i/util/captcha')
    return res
  },
  getIPAddress: async (ip: string) => {
    // const res = await service.get('/ip/?ip=' + ip)
    // return res.data
    return ip
  }
}

export default UtilService
