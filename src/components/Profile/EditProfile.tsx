import { useState } from 'react'

import { PopUpProps } from 'type'
import PopUpModel from 'components/Common/PopUpModel'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { updateUserInfoThunk } from 'redux/slices/userSlice'

const EditProfile = ({open, setOpen}: PopUpProps) => {
  const user = useAppSelector(state => state.user.userInfo)
  const dispatch = useAppDispatch()

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)

  const handleFirstNameChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setFirstName(target.value)
  }

  const handleLastNameChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setLastName(target.value)
  }

  const handleConfirm = () => {
    const nameEmpty = !firstName || !lastName
    if (nameEmpty) return

    dispatch(updateUserInfoThunk({ _id: user._id, firstName, lastName }))
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <PopUpModel open={open}>
      <div className="popupmodel__container">
        <h3 className="text-xl text-dune mb-3">Edit Profile</h3>
        <input 
          type="text" 
          placeholder="First name" 
          className="outline-faded-red p-2 my-2 border rounded-md w-full" 
          onChange={handleFirstNameChange}
          value={firstName}
        />
        <input
          type="text" 
          placeholder="Last name" 
          className="outline-faded-red p-2 my-2 border rounded-md w-full" 
          onChange={handleLastNameChange} 
          value={lastName}
        />
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

export default EditProfile