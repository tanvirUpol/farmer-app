import { useNavigate } from "react-router-dom"

const FormNav = ({ arrow, title }) => {

  const navigate = useNavigate()

  return (
    <div className="form-nav">
      <div className="container">
        {arrow && <img onClick={() => navigate('/')} src={arrow} alt="go home" />}
        {arrow && <p className="title">{title}</p>}
      </div>

      {!arrow && <p className="title-alone">{title}</p>}

    </div>
  )
}
export default FormNav