import { Link } from "react-router-dom";
import TopNav from "../components/TopNav"
import vegData from '../data/vegData.json'

const VegyInfoList = () => {

  return (
    <div>
      <TopNav bool={true} path={'/'} title='সব সবজির তথ্য তালিকা' />

      <div className="custom-container mt-3">
        <div className="vegy_list list-group mt-5">
          {
            vegData.map(item => (
              <Link className="list-group-item list-group-item-action text-center py-3" to={`/infoList/${item.code}`} key={item.code}>
                {item.name}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default VegyInfoList