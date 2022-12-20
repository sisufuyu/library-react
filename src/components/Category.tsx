import React, { useState } from 'react'

import { useAppDispatch } from 'redux/hooks'
import { filterBooksByGenre } from 'redux/slices/booksSlice'
import { categoryList } from 'utils/helper'

const Category = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('All')

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    setValue(target.innerText)
    dispatch(filterBooksByGenre(target.innerText))
  }

  return (
    <section className="px-10 py-3">
      <ul className="flex flex-wrap justify-between">
        <li 
          key='All'
          className={`category-item ${value === 'All' ? 'active' : ''}`} 
          onClick={handleClick}
        >
          All
        </li>
        {categoryList.map(category => 
          <li 
            key={category} 
            className={`category-item ${value === category ? 'active' : ''}`} 
            onClick={handleClick}
          >
            {category}
          </li>
        )}
      </ul>
    </section>
  )
}

export default Category