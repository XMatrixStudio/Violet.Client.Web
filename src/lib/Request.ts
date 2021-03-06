import axios from 'axios'

const Request = axios.create()

Request.defaults.timeout = 2500

export default Request;