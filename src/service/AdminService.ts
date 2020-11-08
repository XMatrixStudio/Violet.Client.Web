import service from './Service'

const AdminService = {
  getRequests: async (req: Admin.Requests.GET.Query) => {
    const res = await service.get<Admin.Requests.GET.ResponseBody>(
      '/api/i/admin/requests',
      { params: req }
    )
    return res
  }
}

export default AdminService
