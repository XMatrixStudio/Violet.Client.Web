import Axios from 'axios'

export default {
  getDevOrgs: async (page: number, limit: number, user?: string) => {
    if (user === undefined) {
      user = 'me'
    }
    const res = await Axios.get<User.Orgs.GET.ResponseBody>(
      '/api/i/users/' + user + '/orgs?page=' + page + '&limit=' + limit
    )
    return res
  }
}
