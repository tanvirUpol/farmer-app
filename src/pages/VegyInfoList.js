import { Link } from "react-router-dom";
import TopNav from "../components/TopNav"
import vegData from '../data/vegData.json'


const VegyInfoList = () => {
  console.log(vegData);
  return (
    <div>
      <TopNav bool={true}  path={'/'} title='সব সবজির তথ্য তালিকা' />  
      <div className="custom-container mt-3">
           <input className="form-control me-2" type="search" placeholder="সার্চ করুন..." aria-label="Search"/>
           <div className="vegy_list list-group">
              {vegData.map(item =>(
                <Link className="list-group-item list-group-item-action text-center" to={`/infoList/${item.code}`} key={item.code} >
                    {item.name}
                </Link>
              ) )}
           </div>
      </div>
    </div>
  )
}
export default VegyInfoList