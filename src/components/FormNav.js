import { useNavigate } from "react-router-dom"

const FormNav = ({arrow,title,firstPage,handlePrevPage}) => {
  const navigate = useNavigate()
  return (
    <div className="form-nav">
          <div className="custom-container">
            {firstPage && arrow &&  <img onClick={() => navigate('/')} src={arrow} alt="" />}
            {!firstPage && arrow &&  <img onClick={handlePrevPage} src={arrow} alt="" />}
            {arrow &&  <p className="title m-0">{title}</p>}
          </div>
          {!arrow && <p className="title-alone m-0">{title}</p>}
            
    </div>
  )
}
export default FormNav