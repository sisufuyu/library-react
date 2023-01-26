import axios, { AxiosRequestConfig } from 'axios'

import { User } from 'type'
import { REACT_APP_SERVER_URL } from '../utils/helper'

const baseUrl = REACT_APP_SERVER_URL + '/api/v1/users'

const instance = axios.create({
  baseURL: baseUrl
})

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  if(config.headers === undefined) config.headers = {}
  else {
    const token = localStorage.getItem('library-access-token')
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

export const updateUser = async (id: string, update: Partial<User>) => {
  return await instance.put(`/${id}`, update)
}

export const fetchUserById = async (id: string) => {
  return await instance.get(`/${id}`)
}
