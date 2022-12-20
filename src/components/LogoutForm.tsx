import { useNavigate } from 'react-router-dom'

import { setLogout } from 'redux/slices/userSlice'
import { useAppDispatch } from 'redux/hooks'

const LogoutForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem('library-access-token')

    dispatch(setLogout())
    navigate('/')
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="w-fit mx-auto my-40 bg-white rounded-2xl p-10">
      <h3 className="text-xl text-dune text-center">Are you sure want to log out?</h3>
      <div className="flex justify-center pt-10">
        <button className="confirm-btn" onClick={handleLogout}>Yes, log out</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default LogoutForm