import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch } from 'redux/hooks'
import { searchBooksThunk } from '../redux/slices/booksSlice'
import Main from 'components/Main'

const Search = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const field =  searchParams.get('search-field')
  const keyword = searchParams.get('keyword')

  useEffect(() => {
    if(field && keyword) {
      dispatch(searchBooksThunk({ field, keyword }))
    }
  }, [dispatch, keyword, field])

  return (
    <div>
      <Main />
    </div>
  )
}

export default Search
