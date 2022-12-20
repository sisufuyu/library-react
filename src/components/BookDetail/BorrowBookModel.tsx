import { useState } from 'react'
import DatePicker from 'react-datepicker'

import { BookModelProps } from 'type'
import PopUpModel from 'components/Common/PopUpModel'
// import DatePicker from './DatePicker'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { borrowBookThunk } from 'redux/slices/booksSlice'
import { addBorrowedBooks } from 'redux/slices/userSlice'
import { getMaxDate } from 'utils/helper'
import 'react-datepicker/dist/react-datepicker.css'

const BorrowBookModel = ({open, setOpen, book}: BookModelProps) => {
  const [borrowDate, setBorrowDate] = useState<Date | null>(new Date())
  const [returnDate, setReturnDate] = useState<Date | null>(null)

  const userId = useAppSelector(state => state.user.userInfo._id)

  const dispatch = useAppDispatch()

  const handleCancel = () => setOpen(false)
  
  const handleBorrowBook = async () => {
    if (!book || !borrowDate || !returnDate) return 

    const result = await dispatch(borrowBookThunk({
      bookId: book._id, 
      borrowDate,
      returnDate,
      borrowerID: userId
    })).unwrap()
    dispatch(addBorrowedBooks(result._id))

    setOpen(false)
  }

  return (
    <PopUpModel open={open}>
      <div className="book-model popupmodel__container h-auto overflow-y-hidden">
        <h1 className="text-center font-semibold text-lg py-2">Borrow Book</h1>
        <p className="py-2">Name: <span className="italic">{book?.title}</span></p>
        <div className="flex items-center">
          <label className="book-model__label mr-6 w-32" htmlFor="borrow-date">Borrow Date</label>
          <DatePicker
            id="borrow-date"
            dateFormat="yyyy/MM/dd"
            selected={borrowDate}
            onChange={(date) => setBorrowDate(date)}
            selectsStart
            startDate={borrowDate}
            endDate={returnDate}
          />
        </div>
        <div className="flex items-center">
          <label className="book-model__label mr-6 w-32" htmlFor="return-date">Return Date</label>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            selectsEnd
            startDate={borrowDate}
            endDate={returnDate}
            minDate={borrowDate}
            maxDate={getMaxDate(borrowDate as Date)}
          />
        </div>
        <p className="py-2 text-stone-400 text-sm">Maximum borrow time: 30 days</p>
        <div className="mt-4 flex justify-end">
        <button className="confirm-btn" onClick={handleBorrowBook}>
            Confirm
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
            Cancel
        </button>
        </div>
      </div>
    </PopUpModel>
  )
}

export default BorrowBookModel