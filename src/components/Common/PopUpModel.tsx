type PopUpProps = {
  children?: React.ReactNode
  open: boolean
}
  
const PopUpModel = ({children, open}: PopUpProps) => {
  return (
    <div>
      <div className={`mask ${open ? '' : 'hidden'}`}></div>
      <div className={`popupmodel ${open ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}
  
export default PopUpModel