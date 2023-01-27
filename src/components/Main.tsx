import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from 'redux/hooks'
import { concatAuthors } from 'utils/helper'
import Loading from './Loading'
import NoResult from 'components/NoResult'
import { REACT_APP_SERVER_URL } from '../utils/helper'

const Main = () => {
  let bookList = useAppSelector((state) => state.books.refList)
  const {loading} = useAppSelector(state => state.books)

  const [showAvailable, setShowAvailable ] = useState(false)

  const changeStatus = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setShowAvailable(target.checked)
  }

  if (!loading && bookList.length === 0) {
    return <NoResult />
  }

  const baseUrl = REACT_APP_SERVER_URL

  return (
    <main>
      <div className="px-10 pb-10 h-full">
        <section className="mt-3 mb-5 flex items-center">
          <label htmlFor="status" className="text-dune">Only show books available</label>
          <input 
            id="status"
            type="checkbox" 
            onChange={changeStatus}
            className="ml-2 h-5 w-5 outline-none border-hidden accent-red-400"
          />
        </section>
        {loading ?
          <Loading /> :
        <section>
          <ul className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-x-4 gap-y-6">
            {bookList.map((book) => {
              if ((showAvailable && book.status) || !showAvailable)  {
                return (
                  <li key={book._id}>
                    <Link to={`/books/${book._id}`} className="flex justify-center item-center">
                    <div className="h-64 w-40 rounded-lg cursor-pointer shadow-lg">
                      <img 
                        src={`${baseUrl}/${book.image}`} 
                        alt="book cover" 
                        className="w-full h-full block rounded-lg object-cover" 
                      />
                    </div>
                    </Link>
                    <Link to={`/books/${book._id}`} className="flex justify-center item-center">
                      <p className="text-dune font-semibold mt-2 hover:text-faded-red hover:underline hover:decoration-faded-red hover:underline-offset-4 leading-6 text-sm truncate">{book.title}</p>
                    </Link>
                    <p className="text-stone-500 text-sm mt-1 truncate text-center">{concatAuthors(book.authors)}</p>
                  </li>
                )
              } else return null
            })}
          </ul>
        </section>
        }
      </div>
    </main>
  )
}

export default Main
