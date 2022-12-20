import { useEffect } from 'react'

import UserInfo from 'components/Profile/UserInfo'
import UserBookShelf from 'components/Profile/UserBookShelf'
import { useAppDispatch } from 'redux/hooks'
import { fetchAuthorsThunk } from 'redux/slices/authorsSlice'
import Alert from 'components/Common/Alert'
import Message from 'components/Common/Message'

const Profile = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsThunk())
  }, [dispatch])

  return (
    <div className="py-10 overflow-y-scroll">
      <Alert />
      <Message />
      <UserInfo />
      <UserBookShelf />
    </div>
  )
}

export default Profile