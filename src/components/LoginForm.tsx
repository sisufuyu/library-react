//import { useGoogleLogin } from '@react-oauth/google'
// const LoginForm = () => {

//   const handleError = () => {
//     console.log('Login Failed')
//   }

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {    
//       console.log('success')
//       console.log(tokenResponse)
//     // fetching userinfo can be done on the client or the server
//       axios
//       .get('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//       })
//       .then(res => console.log(res.data))
//     },
//     onError: handleError
//   })

//   const handleClick = () => {
//     login()
//   }

//   return (
//     <div className="container mx-auto my-20 w-2/4 h-56 flex justify-center items-center bg-white">
//       <button onClick={handleClick} className="rounded-lg px-10 py-8 bg-faded-red text-white">
//         Login with Google 🚀
//       </button>
//     </div>
//   )
// }

import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { useAppDispatch } from 'redux/hooks'
import { setUserInfo, setLoginStatus, setToken } from '../redux/slices/userSlice'
import { Decoded } from 'type'
import HomeIcon from './Common/HomeIcon'

interface CredentialResponse {
  credential?: string
}

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/v1/login', {}, {
      headers: {
        'id_token': credentialResponse.credential as string
      }
    })

    const { token } = res.data

    localStorage.setItem('library-access-token', token)

    const decoded = jwt_decode(token) as Decoded

    if(decoded.user) {
      dispatch(setToken(token))
      dispatch(setLoginStatus(true))
      dispatch(setUserInfo(decoded.user))
    }
    
    navigate('/')
  }

  return (
    <div className="p-10 m-10 md:w-1/2 h-3/5 flex flex-col justify-center items-center">
      <HomeIcon />
      <div className="mt-10 bg-white flex-1 w-full flex flex-col justify-center items-center rounded-lg">
        <h1 className="font-bold text-2xl mb-10">Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </div>
  )
}

export default LoginForm