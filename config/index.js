const isDev = process.env.NODE_ENV === 'development'

let config

if (isDev) {
  config = {
    axiosBase: 'http://localhost:7001',
  }
} else {
  config = {
    axiosBase: 'http://ouath.xmatrix.studio/api',
  }
}

export default config;
