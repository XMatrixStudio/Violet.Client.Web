import axios from 'axios'
import config from '../../config'

const ax = axios.create({
  timeout: 3000,
  baseURL: config.dev.axiosBase
})

export default ax
