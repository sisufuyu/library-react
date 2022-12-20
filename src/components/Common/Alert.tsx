import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { clearAuthorError } from 'redux/slices/authorsSlice'
import { clearBookError } from 'redux/slices/booksSlice'
import { clearUserError } from 'redux/slices/userSlice'

const Alert = () => {
  const [show, setShow] = useState(false)
  const error = useAppSelector(state => state.books.error || state.user.error || state.authors.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error) {
      setShow(true)
      setTimeout(() => {
        setShow(false)
        dispatch(clearAuthorError())
        dispatch(clearBookError())
        dispatch(clearUserError())
      }, 3000)
    } 
  }, [error, dispatch])

  return (
    <div className={`fixed top-20 left-10 z-50 flex p-4 w-[calc(100%-5rem)] bg-red-200 rounded-lg ${show ? '' : 'hidden'}`} role="alert">
      <svg 
        aria-hidden="true" 
        className="flex-shrink-0 w-5 h-5 text-red-700" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
          clipRule="evenodd"
        ></path>
      </svg>
      <span>{error}</span>
    </div>
  )
}

export default Alert