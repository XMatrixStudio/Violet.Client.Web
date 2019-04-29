import Axios from 'axios'

export default {
  getRequests: async (req: Admin.Requests.GET.Query) => {
    const res = await Axios.get<Admin.Requests.GET.ResponseBody>(
      '/api/i/admin/requests',
      { params: req }
    )
    return res
  }
}
