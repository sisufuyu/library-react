import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { setSearchType, setSearchKeyword } from 'redux/slices/booksSlice'

const searchList = ['All', 'Title', 'Author', 'ISBN']

const SearchBox = () => {
  const dispatch = useAppDispatch()
  const { searchKeyword, searchType } = useAppSelector(state => state.books)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => setShow(!show)

  const setSearch = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement
    dispatch(setSearchType(target.innerText.toLocaleLowerCase()))
    setShow(false)
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    dispatch(setSearchKeyword(target.value))
  }

  const handleSearchClick = () => {
    navigate(`/search?search-field=${searchType}&keyword=${searchKeyword}`)
  }

  const handleEnterKey = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.code === 'Enter') {
      handleSearchClick()
    }
  }

  return (
    <div className="search mx-10 rounded-lg h-12 flex-1 flex bg-white">
      <div className="search-categories w-28 p-2.5 cursor-pointer relative">
        <button className="px-2.5 w-full flex justify-between items-center rounded-md" onClick={handleClick}>
          <span className="search-categories__text">{searchType}</span>
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-4 h-4 stroke-neutral-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        </button>
        <ul className={`header__list w-full p-2.5 left-0 transition-transform transition-opacity ${show ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
          {searchList.map(item => 
            <li className="header__list-item" key={item} onClick={setSearch}>{item}</li>
          )}
        </ul>
      </div>
      <div className="search-box flex-1 flex p-2.5">
        <input
          type="text"
          placeholder="Search by book title, author, ISBN"
          className="search-box__input flex-1 h-full border-0 outline-0"
          value={searchKeyword}
          onChange={handleChange}
          onKeyDown={handleEnterKey}
        />
        <button 
          className="search-box__button hover:bg-amber-300 active:bg-amber-300 rounded-sm"
          onClick={handleSearchClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 p-0.5 hover:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBox