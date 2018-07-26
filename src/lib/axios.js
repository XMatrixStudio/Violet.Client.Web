import axios from 'axios'
import config from '../../config'

const ax = axios.create({
  timeout: 3000,
  baseURL: config.build.axiosBase
})

/* ax.defaults.retry = 4
ax.defaults.retryDelay = 1000

ax.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
  let config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err)
  }

  // Increase the retry count
  config.__retryCount += 1

  // Create new promise to handle exponential backOff
  var backOff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 1)
  })

  // Return the promise in which recalls axios to retry the request
  return backOff.then(function () {
    return axios(config)
  })
}) */

export default ax
