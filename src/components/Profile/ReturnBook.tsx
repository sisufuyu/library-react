
import { BookModelProps } from 'type'
import { useAppDispatch } from 'redux/hooks'
import PopUpModel from 'components/Common/PopUpModel'
import { returnBookThunk } from 'redux/slices/booksSlice'
import { removeBorrowedBooks } from 'redux/slices/userSlice'

const ReturnBook = ({ open, setOpen, book }: BookModelProps) => {
  const dispatch = useAppDispatch()

  const handleConfirm = async () => {
    setOpen(false)

    if(!book) return
    const result = await dispatch(returnBookThunk(book._id as string)).unwrap()

    dispatch(removeBorrowedBooks(result._id))
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <PopUpModel open={open}>
      <div className="popupmodel__container">
        <p>Are you sure want to return book <span className="italic font-semibold">{book?.title}</span>?</p>
        <div className="mt-4 flex justify-end">
          <button className="confirm-btn" onClick={handleConfirm}>
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

export default ReturnBook