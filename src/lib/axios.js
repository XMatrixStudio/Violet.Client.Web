import axios from 'axios'
import config from '../../config'

const ax = axios.create({
  timeout: 3000,
  baseURL: config.build.axiosBase
})

export default ax
