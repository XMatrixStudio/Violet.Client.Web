import Request from '../lib/Request'

const AdminService = {
  getRequests: async (req: Admin.Requests.GET.Query) => {
    const res = await Request.get<Admin.Requests.GET.ResponseBody>(
      '/api/i/admin/requests',
      { params: req }
    )
    return res
  }
}

export default AdminService
