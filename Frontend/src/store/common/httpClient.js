import axios from 'axios'

const httpClient = axios.create({
})

// 拦截响应response，并做一些错误处理
httpClient.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  if (err && err.response) {
    console.log(err.response.status)
  }
  return Promise.reject(err)
})

export default httpClient
