const FormNav = ({arrow,title}) => {
  return (
    <div className="form-nav">
          <div className="container">
            {arrow &&  <img src={arrow} alt="" />}
            {arrow &&  <p className="title">{title}</p>}
          </div>
          {!arrow && <p className="title-alone">{title}</p>}
            
    </div>
  )
}
export default FormNav