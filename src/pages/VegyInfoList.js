import TopNav from "../components/TopNav"
import arrow from "../contents/arrow.svg"
const VegyInfoList = () => {
  return (
    <div>
      <TopNav bool={true} arrow={arrow} path={'/'} title='সব সবজির তথ্য তালিকা' />  
      <div className="custom-container">
           <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
           <button className="btn btn-outline-success" type="submit">Search</button>
      </div>
    </div>
  )
}
export default VegyInfoList