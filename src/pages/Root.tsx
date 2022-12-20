import { Outlet } from 'react-router-dom'

import Header from 'components/Header/index'

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root