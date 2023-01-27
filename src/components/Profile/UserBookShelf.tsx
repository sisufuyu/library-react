import {  useState } from 'react'

import { useAppSelector } from 'redux/hooks'
import { Book } from 'type'
import { concatAuthors, formDate } from 'utils/helper'
import ReturnBook from './ReturnBook'

const UserBookShelf = () => {
  const user = useAppSelector(state => state.user.userInfo)
  const borrowedBooks = useAppSelector(state => 
    state.books.bookList.filter(book => user.borrowedBooks.includes(book._id))
  )

  const [open, setOpen] = useState(false)
  const [bookChosen, setBookChosen] = useState<Book>()

  const handleClick = (book: Book) => {
    setOpen(true)
    setBookChosen(book)
  }

  return (
    <section className="mt-6 mx-10">
      <div className="px-10 py-5 bg-white rounded-xl">
        <h2 className="text-2xl my-5 font-bold">My Book Shelf</h2>
        { borrowedBooks.length > 0 ?
          <ul className="grid grid-cols-4 gap-x-2.5 gap-y-4">
            {borrowedBooks.map(book => 
              <li key={book._id} className="preview-book p-2.5 flex flex-col justify-between items-center border rounded-md">
                <p className="preview-book-title text-dune font-medium">{book.title}</p>
                <p className="preview-book-author text-stone-400 text-sm">{concatAuthors(book.authors)}</p>
                <p className="preview-book-date text-stone-400 mt-2 text-sm">Borrow date: {formDate(book.borrowDate)}</p>
                <p className="preview-book-date text-stone-400 text-sm">Return before: {formDate(book.returnDate)}</p>
                <button 
                  className="py-3 px-3 mt-3.5 rounded-xl bg-faded-red text-white text-sm"
                  onClick={() => handleClick(book)}
                >
                  Return
                </button>
              </li>
            )}
          </ul> :
          <div className="flex justify-center opacity-30">
            <img src="/images/bookshelves.png" className="max-h-80" alt="bookshelf"/>
          </div>
        }
      </div>
      <ReturnBook open={open} setOpen={setOpen} book={bookChosen} />
    </section>
  )
}

export default UserBookShelf