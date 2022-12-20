import { Link } from 'react-router-dom'

const HomeIcon = () => {
  return (
    <Link to="/" className="header__logo text-3xl font-medium flex items-center">
      <img src="/images/book-logo.png" alt="logo" className="h-6 mr-2" />
      LIBRARY
    </Link>
  )
}

export default HomeIcon