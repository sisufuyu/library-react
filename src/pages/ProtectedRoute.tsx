import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAppSelector } from 'redux/hooks'

const ProtectedRoute = ({ permission }: { permission: string[] }) => {
  const { userInfo: { role }, loginStatus } = useAppSelector(state => state.user)

  //validate user login and have permission
  const userValid = loginStatus && permission.includes(role)
  console.log(` permission ${permission}, role ${role}, login ${loginStatus}`)

  const navigate = useNavigate()
  
  useEffect(() => {
    if (!userValid) { 
      navigate('/login')
    }
  }, [userValid, navigate])

  return <Outlet />
}

export default ProtectedRoute