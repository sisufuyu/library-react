import axios, { AxiosRequestConfig } from 'axios'
import { AuthorWithoutId, Author } from 'type'
import { REACT_APP_SERVER_URL } from '../utils/helper'

const baseUrl = REACT_APP_SERVER_URL + '/api/v1/authors'

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

export const createAuthor = async (author: AuthorWithoutId) => {
  return await instance.post('/', author)
}

export const fetchAuthors = async () => {
  return await instance.get('/')
}

export const editAuthorById = async (id: string, update: Partial<Author>) => {
  return await instance.put(`/${id}`, update)
}

export const deleteAuthorById = async (id: string) => {
  return await instance.delete(`/${id}`)
}