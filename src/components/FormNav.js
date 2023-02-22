import { useNavigate } from "react-router-dom"

const FormNav = ({arrow,title,page,handlePrevPage}) => {
  const navigate = useNavigate()
  return (
    <div className="form-nav">
          <div className="custom-container">
            {page === 1 &&   <img onClick={() => navigate('/')} src={arrow} alt="" />}
            {(page === 2 || page === 3) &&   <img onClick={handlePrevPage} src={arrow} alt="" />}
            {page !== 4 &&  <p className="title m-0">{title}</p>}
          </div>
          {page === 4 && <p className="title-alone m-0">{title}</p>}
            
    </div>
  )
}
export default FormNav