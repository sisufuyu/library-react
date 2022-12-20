import { useState, useEffect } from 'react'

import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { deleteBookThunk, fetchBooksThunk } from 'redux/slices/booksSlice'
import { sliceData, concatAuthors } from 'utils/helper'
import Pagination from 'components/Common/Pagination'
import DeleteModel from './DeleteModel'
import { Book } from 'type'
import EditBookFom from './EditBookForm'
import UploadBookImage from './UploadBookImage'

const BookTable = () => {
  const dispatch = useAppDispatch()
  const books = useAppSelector(state => state.books.bookList)

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [dispatch])

  const [book, setBook] = useState<Book>()
  const [page, setPage] = useState(1)
  //handle delete book model open
  const [open, setOpen] = useState(false)
  //handle edit book model show
  const [show, setShow] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)

  const rowsPerPage = 5
  const sliceList = sliceData(books, page, rowsPerPage)

  const handleDeleteClick = (book: Book) => {
    setBook(book)
    setOpen(true)
  }

  const deleteBook = () => {
    dispatch(deleteBookThunk(book?._id as string))
    setOpen(false)
  }

  const handleEditClick = (book: Book) => {
    setBook(book)
    setShow(true)
  }

  const handleUploadClick = (book: Book) => {
    setBook(book)
    setImageOpen(true)
  }

  return (
    <section className="mx-10 my-6">
      <h3 className="text-lg font-semibold py-2 text-center">Books</h3>
      <div className="overflow-x-auto overflow-y-hidden h-80 relative shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-stone-500 table-fixed">
          <thead className="text-xs text-stone-700 uppercase bg-stone-50 h-10">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Authors
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
                <span className="sr-only">Upload Image</span>
                <span className="sr-only">Delete</span>
              </th>    
            </tr>
          </thead>
          <tbody>
            {sliceList.map(book =>
              <tr className="bg-white border-b border-stone-50 hover:bg-stone-50 h-14 box-border" key={book._id}>
                <td className="py-4 px-6 truncate">
                  {book.title}
                </td>
                <td className="py-4 px-6 truncate">
                  {concatAuthors(book.authors)}
                </td>
                <td className="py-4 px-6 truncate">
                  {book.description}
                </td>
                <td className="py-4 px-6 text-right">
                  <button 
                    className="text-amber-400 cursor-pointer"
                    onClick={() => handleEditClick(book)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-amber-400 cursor-pointer ml-6"
                    onClick={() => handleUploadClick(book)}
                  >
                    Upload Image
                  </button>
                  <button 
                   className="text-red-500 cursor-pointer ml-6 disabled:text-stone-400 disabled:cursor-not-allowed"  
                   disabled={!book.status}
                   onClick={() => handleDeleteClick(book)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination length={books.length} page={page} setPage={setPage} rowsPerPage={rowsPerPage} />   
      <DeleteModel
        name={book?.title as string} 
        type='book' 
        open={open} 
        setOpen={setOpen} 
        handleDelete={deleteBook}
      />
      <EditBookFom open={show} setOpen={setShow} book={book} />
      <UploadBookImage open={imageOpen} setOpen={setImageOpen} book={book} />
    </section>
  )
}

export default BookTable