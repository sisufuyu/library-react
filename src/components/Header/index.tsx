import SearchBox from './SearchBox'
import HeaderMenu from './HeaderMenu'
import HomeIcon from 'components/Common/HomeIcon'

const Header = () => {
  return (
    <header className="header h-20">
      <div className="px-10 h-full flex justify-between items-center">
        <HomeIcon />
        <SearchBox />
        <HeaderMenu />
      </div>
    </header>
  )
}

export default Header
