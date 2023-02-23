
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
      <div className="custom-container mt-3">
        <div className="vegyimage d-flex flex-column justify-content-center align-items-center mb-2">
          <img src="https://via.placeholder.com/150x100/" alt="" />
          <p className="mt-2 fw-bold vegy-title" >{vegetable[0].name}</p>
        </div>
        <div className="vegyFeatures">
        <p className="fw-bold fs-6 vegy-title mb-2" >বৈশিষ্ট্যাবলী</p>
        <table className="table text-center table-bordered -3">
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

        <div className="collect-info">
        <p className="fw-bold fs-6 vegy-title mb-2" >সংগ্রহের দিকনির্দেশনা</p>
          <ul>
            <li>{vegetable[0].freshness}</li>
            <li>{vegetable[0].fruit_selection}</li>
            <li>{vegetable[0].maturity}</li>
            <li>{vegetable[0].pests_and_diseases}</li>
          </ul>


        </div>
      </div>
    </div>
  )
}
export default VegyInfo