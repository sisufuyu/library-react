import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from 'redux/hooks'

const HeaderMenuOption = () => {
  const { firstName: name, role} = useAppSelector(state => state.user.userInfo)
  
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <div className="relative">
      <button className="header__button ml-2 h-12 px-6 rounded-lg bg-faded-red text-white w-28" onClick={handleClick}>
        Hi, {name}
      </button>
      <ul className={`header__list right-0 transition-transform transition-opacity ${show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
        <li className="header__list-item">
          <Link to ="/profile" onClick={handleClick}>Profile</Link>
        </li>
        {role === 'ADMIN' &&
          <li className="header__list-item">
            <Link to ="/dashboard" onClick={handleClick}>Dashboard</Link>
          </li> 
        }
        <li className="header__list-item cursor-pointer">
          <Link to="logout" onClick={handleClick}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default HeaderMenuOption