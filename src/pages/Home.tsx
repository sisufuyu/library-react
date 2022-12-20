import { useEffect } from 'react'

import Main from 'components/Main'
import { useAppDispatch } from 'redux/hooks'
import { setSearchType, setSearchKeyword, fetchBooksThunk } from 'redux/slices/booksSlice'
import Category from 'components/Category'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSearchType('all'))
    dispatch(setSearchKeyword(''))
    dispatch(fetchBooksThunk())
  }, [dispatch])

  return (
    <div>
      <Category />
      <Main />
    </div>
  )
}

export default Home
