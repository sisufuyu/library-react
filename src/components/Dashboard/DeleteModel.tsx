import PopUpModel from 'components/Common/PopUpModel'
import { DeleteModelProps } from 'type'

const DeleteModel = ({ name, type, open, setOpen, handleDelete }: DeleteModelProps) => {
  const handleCancel = () => setOpen(false)

  return (
    <PopUpModel open={open}>
      <div className="popupmodel__container">
        <h3 className="text-xl text-dune text-center">
          Are you sure want to delete {type}&nbsp;
          <span className={`font-semibold ${type === 'book' ? 'italic': ''}`}>{name}</span>?
        </h3>
        <div className="flex justify-center mt-10">
          <button className="confirm-btn" onClick={handleDelete}>Yes, delete</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </PopUpModel>
  )
}

export default DeleteModel