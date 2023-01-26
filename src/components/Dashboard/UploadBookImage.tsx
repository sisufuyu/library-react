import { useEffect, useRef, useState } from 'react'

import PopUpModel from "components/Common/PopUpModel"
import {BookModelProps} from 'type'
import { uploadBookImageThunk } from 'redux/slices/booksSlice'
import { useAppDispatch } from 'redux/hooks'
import { REACT_APP_SERVER_URL } from '../../utils/helper'

const UploadBookImage = ({ open, setOpen, book }: BookModelProps) => {
  const [image, setImage] = useState<File>()
  const [url, setUrl] = useState<string>('/images/open-book.png')
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUrl('/images/open-book.png')
    const baseUrl = REACT_APP_SERVER_URL
    if(book?.image) {
      setUrl(`${baseUrl}/${book.image}`)
    }
  }, [book])

  const handleDragOver = (event: React.DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const file = event.dataTransfer.files[0] as File
    setImage(file)
    setUrl(URL.createObjectURL(file))
  }

  const handleFileChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] as File

    setImage(file)
    setUrl(URL.createObjectURL(file))
  }

  const handleFileClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement
    target.value = ''
  }

  const handleConfirm = () => {
    if (!image) return
    const formData = new FormData()
    formData.append('image', image as File, image?.name)
    dispatch(uploadBookImageThunk({ _id: book?._id as string, image: formData }))

    //reset image and input value
    setImage(undefined)
    if (inputRef.current) inputRef.current.value = ''

    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }
  
  return (
    <PopUpModel open={open}>
      <div className="popupmodel__container">
        <h3 className="popupmodel__title">Upload Book Cover Image</h3>
        <div className="flex items-center">
        <div className="h-64 flex flex-col justify-between items-center w-full"> 
          <div 
            className="flex-1 flex flex-col justify-center items-center w-full rounded-lg border border-stone-300 cursor-pointer hover:bg-stone-100"
            onDragOver={handleDragOver} onDrop={handleDrop}
          >
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
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Drag and drop</span></p>
            <p className="text-xs text-gray-500">PNG or JPG</p>
          </div>
            <input 
              id="dropzone-file" 
              type="file" 
              name="bookCover" 
              className="mt-2 h-10 p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" 
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              onClick={handleFileClick}
              ref={inputRef}
            />
        </div>
          <div className="flex justify-center items-center ml-6 w-64 h-64 p-2 rounded-lg border border-stone-300">
            <img src={url} className="h-60" alt="book cover" />
          </div>
        </div>
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

export default UploadBookImage