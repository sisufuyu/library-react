import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { fetchAuthorsThunk, editAuthorByIdThunk, deleteAuthorThunk } from 'redux/slices/authorsSlice'
import Pagination from 'components/Common/Pagination'
import AuthorModel from './AuthorModel'
import DeleteModel from './DeleteModel'
import { sliceData } from 'utils/helper'
import { Author } from 'type'

const AuthorTable = () => {
  const authors = useAppSelector(state => state.authors.authorList)
  const books = useAppSelector(state => state.books.bookList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsThunk())
  }, [dispatch])

  const [page, setPage] = useState(1)
  // control edit author model open
  const [open, setOpen] = useState(false)
  // control show delete author model
  const [show, setShow] = useState(false)
  const [author, setAuthor] = useState<Author>({_id: '', fullName: '', biography: ''})
  const [error, setError] = useState('')
  
  const rowsPerPage = 5
  const sliceList = sliceData(authors, page, rowsPerPage)

  const canNotDelete = (author: Author) => {
    return books.some(book => {
      return book.authors.some(au => au._id === author._id)
    })
  }

  const handleEditClick = (author: Author) => {
    setOpen(true)
    setAuthor(author)
  }

  const handleChangeName = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setAuthor({ ...author, fullName: target.value })
  }

  const handleChangeBiography = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setAuthor({ ...author, biography: target.value })
  }

  const handleEditAuthor = () => {
    if (!author.fullName) return
    setOpen(false)
    dispatch(editAuthorByIdThunk({_id: author._id, author}))
  }

  const handleDeleteClick = (author: Author) => {
    setShow(true)
    setAuthor(author)
  }

  const handleDeleteAuthor = () => {
    setShow(false)
    dispatch(deleteAuthorThunk(author._id))
  }

  return (
    <section className="mx-10 my-6">
      <h3 className="text-lg font-semibold py-2 text-center">Authors</h3>
      <div className="overflow-x-auto overflow-y-hidden h-80 relative shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-stone-500 table-fixed">
          <thead className="text-xs text-stone-700 uppercase bg-stone-50 h-10">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Biography
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sliceList.map(author => 
              <tr className="bg-white border-b border-stone-50 hover:bg-stone-50 h-14 box-border" key={author._id}>
                <td className="py-4 px-6">
                    {author.fullName}
                </td>
                <td className="py-4 px-6 truncate">
                    {author.biography}
                </td>
                <td className="py-4 px-6 text-right">
                  <button 
                    className="text-amber-400 cursor-pointer" 
                    onClick={() => handleEditClick(author)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-500 cursor-pointer ml-6 disabled:text-stone-400 disabled:cursor-not-allowed" 
                    onClick={() => handleDeleteClick(author)}
                    disabled={canNotDelete(author)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>  
      </div>
      <Pagination length={authors.length} page={page} setPage={setPage} rowsPerPage={rowsPerPage} />
      <AuthorModel
        open={open} 
        setOpen={setOpen} 
        handleConfirm={handleEditAuthor} 
        name={author.fullName} 
        handleChangeName={handleChangeName} 
        biography = {author?.biography || ''} 
        handleChangeBiography={handleChangeBiography}
        error={error}
      />
      <DeleteModel
        name={author.fullName}
        type='author'
        open={show}
        setOpen={setShow}
        handleDelete={handleDeleteAuthor} 
      />
    </section>
  )
}

export default AuthorTable