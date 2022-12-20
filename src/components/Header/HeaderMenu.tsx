import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useJwt } from 'react-jwt'

import { useAppSelector, useAppDispatch } from 'redux/hooks'
import HeaderMenuOption from './HeaderMenuOption'
import { setLoginStatus, setLogout, setToken, setUserInfo } from 'redux/slices/userSlice'
import { Decoded } from 'type'

const HeaderMenu = () => {
  const { loginStatus } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.user.token)
   || localStorage.getItem('library-access-token')
   || ''

  //validate token
  const { isExpired, decodedToken } = useJwt(token)
  const tokenValid = !isExpired && decodedToken

  //if token already expired, but user is login status, then need logout 
  const needLogout = !tokenValid && loginStatus

  //if token is valid but user is not login, then need login
  const needLogin = tokenValid && !loginStatus

  useEffect(() => {
    if (needLogout) {
      // console.log('menu login')
      dispatch(setLogout())
      return
    }

    if (needLogin) {
      // console.log('menu login')
      dispatch(setToken(token))
      dispatch(setLoginStatus(true))
      dispatch(setUserInfo((decodedToken as Decoded).user))
    } 

  }, [needLogout, needLogin, dispatch, token, decodedToken])

  return (
    <div className="flex">
    {/* <Link to="/register">
    <button className="header__button h-12 px-4 rounded-lg border border-faded-red text-faded-red">
        Register
    </button>
    </Link> */}
    {loginStatus ?
      <HeaderMenuOption /> :
      <Link to="/login">
        <button className="header__button ml-2 h-12 px-6 rounded-lg bg-faded-red text-white">
          Login
        </button>
      </Link>
    }
    </div>
  )
}

export default HeaderMenu