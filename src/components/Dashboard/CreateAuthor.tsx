import React, { useState } from 'react'

import AuthorModel from './AuthorModel'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { createAuthorThunk } from 'redux/slices/authorsSlice'
import { capitalizeName } from 'utils/helper'

const CreateAuthor = () => {
  const [open, setOpen] = useState(false)
  const [biography, setBiography] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const authors = useAppSelector(state => state.authors.authorList)

  const dispatch = useAppDispatch()

  const handleClick = () => setOpen(true)

  const handleChangeName = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    if (!target.value) setError('Author name required!')
    else setError('')
    setName(target.value)
  }

  const handleChangeBiography = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setBiography(target.value)
  }

  const handleConfirm = () => {
    if (!name) return
    const capitialName = capitalizeName(name)

    const authorExist = authors.find(author => author.fullName === capitialName)
    if (authorExist) {
      setError('Author already exists')
      return
    } else setError('')

    setOpen(false)
    dispatch(createAuthorThunk({ fullName: capitialName, biography }))
    setName('')
    setBiography('')
  }

  return (
    <div className="flex-1 relative">
      <div className="dashboard-box" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path 
            fillRule="evenodd" 
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" 
            clipRule="evenodd"
            className="fill-amber-400"
          />
        </svg>
        <span className="px-4">Create new author</span>
      </div>
      <AuthorModel 
        open={open} 
        setOpen={setOpen} 
        handleConfirm={handleConfirm} 
        name={name} 
        handleChangeName={handleChangeName}
        biography={biography}
        handleChangeBiography={handleChangeBiography}
        error={error}
      />
    </div>
  )
}

export default CreateAuthor