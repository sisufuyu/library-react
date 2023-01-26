import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { fetchBookByIdThunk } from 'redux/slices/booksSlice'
import NotFound from 'components/NotFound'
import BookDetailList from './BookDetailList'
import BorrowBookModel from './BorrowBookModel'
import { REACT_APP_SERVER_URL } from '../../utils/helper'

const BookDetail = ({ bookId }: { bookId: string | undefined }) => {
  const dispatch = useAppDispatch()

  const book = useAppSelector((state) => 
    state.books.bookList.find(b => b._id === bookId) || state.books.currentBook
  )
  const error = useAppSelector(state => state.books.error)
  const loginStatus = useAppSelector(state => state.user.loginStatus)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    if (!loginStatus) navigate('/login')
    else setOpen(true)
  }

  useEffect(() => {
    if (!book._id && bookId) {
      dispatch(fetchBookByIdThunk(bookId))
    }
  }, [book._id, bookId, dispatch])

  if (!bookId || !book._id || error === 'Not Found!') {
    return <NotFound />
  }

  const baseUrl = REACT_APP_SERVER_URL

  return (
    <div className="py-10">
      <div className="book-detail px-10">
        <div className="w-full mx-auto bg-white p-7 rounded-2xl flex flex-col">
          <div className="flex justify-between">
            <div>
              <p className="book-detail-title text-2xl text-faded-red mb-3">
                {book.title}
              </p>
              <BookDetailList book={book}/>
            </div>
            <div className="h-64 w-48">
              <img src={`${baseUrl}/${book.image}`} alt="book cover" className="h-64 rounded-lg" />
            </div>
          </div>
          <div className="book-detail-description mt-4">
            <p className="book-detail-text">Description</p>
            <p className="book-detail-content ml-0 mt-1">{book.description}</p>
          </div>
          <div className="mt-8">
            <button 
              className="float-right h-12 px-12 rounded-lg bg-faded-red text-white disabled:bg-stone-200 disabled:text-slate-500" 
              disabled={!book.status}
              onClick={handleClick}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
      <BorrowBookModel open={open} setOpen={setOpen} book={book} />
    </div>
  )
}

export default BookDetail
