import axios, { AxiosRequestConfig } from 'axios'

import { BookUpdateProps, BookBorrowProps } from 'type'
import { REACT_APP_SERVER_URL } from '../utils/helper'

const baseUrl = REACT_APP_SERVER_URL + '/api/v1/books'

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

export const fetchBooks = async () => {
  return await axios.get(baseUrl)
}

export const fetchBookById = async (id: string) => {
  return await axios.get(`${baseUrl}/${id}`)
}

export const borrowBook = async (id: string, update: BookBorrowProps) => {
  return await instance.put(`/${id}/borrowInfo`, update)
}

export const returnBook = async (id: string) => {
  return await instance.put(`/${id}/returnInfo`, {})
}

export const createBook = async (book: FormData) => {
  return await instance.post('/', book, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteBook = async (id: string) => {
  return await instance.delete(`/${id}`)
}

export const updateBook = async (id: string, update: BookUpdateProps) => {
  return await instance.put(`/${id}/basicInfo`, update)
}

export const uploadBookImage = async (id:string, img: FormData) => {
  return await instance.put(`/${id}/image`, img, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const searchBooks = async (field: string, keyword: string) => {
  return await axios.get(`${baseUrl}/search?field=${field}&keyword=${keyword}`)
}