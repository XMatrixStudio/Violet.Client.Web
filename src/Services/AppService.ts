import Axios from 'axios'

export default {
  newApp: async (req: PostApps.ReqBody) => {
    const res = await Axios.post('/api/i/apps', req)
    return res
  }
}
