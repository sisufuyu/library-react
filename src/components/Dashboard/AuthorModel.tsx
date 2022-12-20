import React from 'react'

import PopUpModel from 'components/Common/PopUpModel'

type AuthorModelProps = {
  open: boolean
  setOpen: (open: boolean) => void
  handleConfirm: () => void
  name: string
  handleChangeName: (event: React.ChangeEvent) => void
  biography: string
  handleChangeBiography: (event: React.ChangeEvent) => void
  error: string
}

const AuthorModel = ({
  open, 
  setOpen, 
  handleConfirm, 
  name, 
  handleChangeName, 
  biography, 
  handleChangeBiography,
  error,
}: AuthorModelProps) => {
  const handleCancel = () => setOpen(false)

  return (
    <PopUpModel open={open}>
      <div className="author-model popupmodel__container">
        <h3 className="popupmodel__title">Author</h3>
        <div>
          <label htmlFor="author-name">Author Name</label>
          <input 
            type="text" 
            name="authorName" 
            id="author-name" 
            className="text-input w-full"
            value={name}
            onChange={handleChangeName}
          />
          <p className="input-error">{error}</p>
        </div>
        <div>
            <label htmlFor="author-biography">Author biography</label>
            <textarea 
            name="authorBiography" 
            id="author-biography" 
            rows={10}
            className="text-input w-full"
            value={biography}
            onChange={handleChangeBiography}
            />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </PopUpModel>
  )
}

export default AuthorModel