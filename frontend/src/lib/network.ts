import axios from 'axios'

export const bffServerUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL! + 'api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const apiBackendUrl = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL! + 'api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log({ config })
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
