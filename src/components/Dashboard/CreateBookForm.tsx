import React, { useState } from 'react'

import PopUpModel from 'components/Common/PopUpModel'
import { categoryList } from 'utils/helper'
import useField from 'Hooks/useField'
import { useAppDispatch } from 'redux/hooks'
import { createBookThunk } from 'redux/slices/booksSlice'
import { capitalizeName, formDate } from 'utils/helper'
import { PopUpProps } from 'type'
import 'react-datepicker/dist/react-datepicker.css'

type ErrorProps = {
  author: string
  genre: string
  image: string
}

const CreateBookForm = ({ open, setOpen }: PopUpProps) => {
  const title = useField('title')
  const ISBN13 = useField('ISBN13')
  const publisher = useField('publisher')
  const publishedDate = useField('published date')
  const description = useField('description')

  const [author, setAuthor] = useState('')
  const [authors, setAuthors] = useState<string[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [image, setImage] = useState<File>()
 
  const [err, setErr] = useState<ErrorProps>({
    author: '',
    genre: '',
    image: '',
  })

  const dispatch = useAppDispatch()

  const handleAuthorChange = (event: React.ChangeEvent) => {
    setErr({...err, author: ''})
    const target = event.target as HTMLInputElement
    setAuthor(target.value)
  }

  const addAuthor = () => {
    if (authors.includes(author)) setErr({...err, author: 'No duplicate Authors'})
    else {
      setAuthors([...authors, capitalizeName(author.trim())])
      setAuthor('')
    }
  }

  const handleDeleteAuthor = (author: string) => {
    setAuthors(authors.filter(au => au !== author))
  } 

  const handleGenreChange = (event: React.ChangeEvent) => {
    setErr({...err, genre: ''})
    const target = event.target as HTMLSelectElement
    const values = Array.from(target.selectedOptions, option => option.value)
    setGenres(values)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    setErr({...err, image: ''})

    event.stopPropagation()
    event.preventDefault()

    const file = event.dataTransfer.files[0] as File
    setImage(file)
  }

  const handleFileChange = (event: React.ChangeEvent) => {
    setErr({...err, image: ''})

    const target = event.target as HTMLInputElement
    const file = target.files?.[0] as File
    setImage(file)
  }

  const handleFileClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement
    target.value = ''
  }

  const deleteImage = () => setImage(undefined)

  // if value is missing, set error and return false, otherwise return true
  const requireValidate = (value: string | string[], key: keyof ErrorProps): boolean => {
    const error = {...err}
    error[key] = `${key} is required` 
    if (!value || value.length === 0) {
      setErr(error)
      return false
    }
    return true
  }

  // if image is undefined, return false, otherwise return true
  const validateImage = () => {
    if (!image) {
      setErr({...err, image: 'image is required'})
      return false
    }
    return true
  }

  const handleConfirm = () => {
    if (!title.validate() || 
      !ISBN13.validate() ||
      !publisher.validate() || 
      !publishedDate.validate() ||
      !requireValidate(authors, 'author') ||
      !requireValidate(genres, 'genre') ||
      !description.validate() ||
      !validateImage()
    ) {
      return
    } 

    const formData = new FormData()

    formData.append('title', title.value)
    formData.append('ISBN13', ISBN13.value)
    formData.append('publisher', publisher.value)
    formData.append('publishedDate', publishedDate.value)
    formData.append('description', description.value)
    formData.append('authors', JSON.stringify(authors))
    formData.append('genres', JSON.stringify(genres))
    formData.append('image', image as File, image?.name)

    dispatch(createBookThunk(formData))
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <PopUpModel open={open}>
      <div className="popupmodel__container book-model">
        <h3 className="popupmodel__title">Create New Book</h3>
        <div className="book-model__wrapper">
          <div className="book-model__item mr-10">
            <label htmlFor="book-title" className="book-model__label">Book Title</label>
            <input 
              type="text" 
              id="book-title" 
              name="bookTitle"
              className="text-input h-8"
              value={title.value}
              onChange={title.onChange}
            />
            <p className="book-model__error">{title.err}</p>
          </div>
          <div className="book-model__item">
            <label htmlFor="isbn13" className="book-model__label">ISBN13</label>
            <input 
              type="text"
              name="isbn13" 
              id="isbn13" 
              className="text-input h-8"
              value={ISBN13.value}
              onChange={ISBN13.onChange}
            />
            <p className="book-model__error">{ISBN13.err}</p>
          </div>
        </div>
        <div className="book-model__wrapper">
          <div className="book-model__item mr-10">
            <label htmlFor="publisher" className="book-model__label">Publisher</label>
            <input 
              type="text" 
              name="publisher" 
              id="publisher" 
              className="text-input h-8"
              value={publisher.value}
              onChange={publisher.onChange}
            />
            <p className="book-model__error">{publisher.err}</p>
          </div>
          <div className="book-model__item">
            <label htmlFor="published-date" className="book-model__label">Published date</label>
            <input
              type="date" 
              name="PublishedDate" 
              id="published-date" 
              className="text-input h-8"
              value={formDate(publishedDate.value)}
              onChange={publishedDate.onChange}
            />
            <p className="book-model__error">{publishedDate.err}</p>
          </div>
        </div>
        <div className="flex flex-wrap py-1">
          <div className="flex-1 flex py-1 items-center justify-start">
            <label htmlFor="author-name" className="book-model__label">Authors</label>
            <input 
              type="text" 
              name="authorName" 
              id="author-name" 
              className="text-input h-8 flex-1 ml-6"
              value={author}
              onChange={handleAuthorChange}
            />
            <button className="bg-faded-red p-2 text-white rounded-lg mx-4 text-sm" onClick={addAuthor}>Add</button>
          </div>
          <ul className="flex-1 flex items-center justify-start">
            {authors.map(author => 
              <li key={author} className="mr-3 bg-stone-50 p-2 flex justify-between rounded-md text-dune">
                <span>{author}</span>
                <button onClick={() => handleDeleteAuthor(author)}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 stroke-red-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            )}
          </ul>
        </div>
        <p className="book-model__error">{err?.author}</p>
        <div className="py-1">
          <div className="flex flex-wrap py-1 items-center">
            <label htmlFor="genres" className="book-model__label">Select genres</label>
            <ul className="flex-1 flex items-center justify-start">
              {genres.map(genre => 
                <li key={genre} className="mr-3 bg-stone-100 p-2 flex rounded-md text-dune">
                  <span>{genre}</span>
                </li>
              )}
            </ul>
          </div>
          <select 
            multiple 
            id="genres" 
            className="bg-stone-50 text-dune text-sm border rounded-lg focus:ring focus:ring-amber-400 focus:ring-offset-2 focus:outline-none w-full h-52 p-2.5 mt-2"
            onChange={handleGenreChange}
          >
            {categoryList.map(category => 
              <option value={category} key={category}>{category}</option>
            )} 
          </select>
          <p className="text-stone-400 text-sm py-1">Press Ctrl to select multiple genres</p>
          <p className="book-model__error">{err?.genre}</p>
        </div>
        <div className="py-1">
          <label htmlFor="description">Description</label>
          <textarea 
            name="description" 
            id="description" 
            rows={10}
            className="outline-faded-red p-2 my-2 border rounded-md w-full h-60"
            value={description.value}
            onChange={description.onChange}
          />
          <p className="book-model__error">{description.err}</p>
        </div>
        <p>Book Cover</p>
        <div className="flex justify-between items-center w-full my-2" onDragOver={handleDragOver} onDrop={handleDrop}>
          <label 
            htmlFor="dropzone-file" 
            className="flex flex-col justify-center items-center w-full h-56 rounded-lg border-2 border-stone-300 border-dashed cursor-pointer hover:bg-stone-100"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg 
                aria-hidden="true" 
                className="mb-3 w-10 h-10 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                >
                </path>
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PNG or JPG</p>
            </div>
            <input 
              id="dropzone-file" 
              type="file" 
              name="bookCover" 
              className="invisible" 
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              onClick={handleFileClick}
            />
          </label>
        </div>
        {image &&
          <p className="bg-stone-100 p-2 flex justify-between rounded-md text-dune">
            <span>{image?.name}</span>
            <button onClick={deleteImage}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6 stroke-red-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </p>
        }
        <p className="book-model__error">{err?.image}</p>
        <div className="mt-2 flex justify-center">
          <button className="bg-faded-red p-2 text-white rounded-lg ml-10 text-sm" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="bg-white border p-2 text-gray-500 rounded-lg ml-10 text-sm" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </PopUpModel>
  )
}

export default CreateBookForm
