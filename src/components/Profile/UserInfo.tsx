import { useState } from 'react'

import { useAppSelector } from 'redux/hooks'
import EditProfile from './EditProfile'

const UserInfo = () => {
  const user = useAppSelector(state => state.user.userInfo)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <section className="my-4">
      <div className="relative mx-10 px-10 py-5 bg-white rounded-xl flex justify-between items-center">
        <div className="absolute right-5 top-5" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-stone-500">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl my-5 font-bold">{`${user.firstName} ${user.lastName}`}</h1> 
          <h3 className="text-lg my-5">{user.email}</h3>
          <h3 className="text-lg my-5">Role: {user.role.toLocaleLowerCase()}</h3>
        </div>
        <div className="w-28 h-36 mr-5 bg-white rounded-md border border-stone-200 drop-shadow-lg">
          <div className="w-24 h-28 mr-5 bg-white rounded-sm ml-2 mt-2">
            <img src="images/avatar.png" className="w-full h-full" alt="avatar"></img>
          </div>
        </div>
      </div>
      <EditProfile open={open} setOpen={setOpen} />
    </section>
  )
}

export default UserInfo