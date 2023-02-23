import { useNavigate } from "react-router-dom"
import arrow from "../contents/arrow.svg"

const TopNav = ({ title, bool, path }) => {

  const navigate = useNavigate()

  return (
    <div className="top-nav">
      {path &&
        <div className="custom-container">
          {bool && <img onClick={() => navigate(path)} src={arrow} alt="go back" />}
          {!bool && <img onClick={path} src={arrow} alt="go back" />}
          {<p className="title m-0">{title}</p>}
        </div>
      }

      {!path && <p className="title-alone m-0">{title}</p>}

    </div>
  )
}
export default TopNav