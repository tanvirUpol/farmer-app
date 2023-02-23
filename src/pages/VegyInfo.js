
import { useParams } from "react-router-dom"
import TopNav from "../components/TopNav"
import vegData from '../data/vegData.json'


const VegyInfo = () => {

  const { id } = useParams()
  const code = parseInt(id)
  

  const vegetable = vegData.filter(item => {
    return item.code === code
  })
  
  console.log(vegetable[0]);

  return (
    <div className="vegyInfo">
      <TopNav bool={true}  path={'/infoList'} title={`আদর্শ ${vegetable[0].name}`} />  
      <div className="custom-container">
        <div className="vegyimage d-flex flex-column justify-content-center align-items-center">
          <img src="https://via.placeholder.com/150x100/" alt="" />
          <p className="fw-bold vegy-title" >{vegetable[0].name}</p>
        </div>
        <div className="vegyFeatures">
        <p className="fw-bold fs-6 vegy-title" >বৈশিষ্ট্যাবলী</p>
        <table className="table text-center table-bordered rounded">
            <thead>
              <tr>
                <th scope="col">দৈর্ঘ্য</th>
                <th scope="col">প্রস্থ</th>
                <th scope="col">রঙ</th>
                <th scope="col">ওজন</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >{vegetable[0].height}</td>
                <td>{vegetable[0].width}</td>
                <td>{vegetable[0].color}</td>
                <td>{vegetable[0].weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default VegyInfo