import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { clearAuthorMessage } from 'redux/slices/authorsSlice'
import { clearBookMessage } from 'redux/slices/booksSlice'

const Message = () => {
  const [show, setShow] = useState(false)

  const message = useAppSelector(state => state.books.message || state.authors.message)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (message) {
      setShow(true)
      setTimeout(() => {
        setShow(false)
        dispatch(clearAuthorMessage())
        dispatch(clearBookMessage())
      }, 3000)
    }
  }, [message, dispatch])

  return (
    <div className={`fixed top-20 left-10 z-50 flex p-4 w-[calc(100%-5rem)] bg-green-100 rounded-lg ${show ? '' : 'hidden'}`} role="alert">
      <svg 
        aria-hidden="true" 
        className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" 
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
      <div className="ml-4 text-sm font-medium text-green-700 dark:text-green-800">
        {message}
      </div>
    </div>
  )
}

export default Message