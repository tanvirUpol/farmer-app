
import { useParams } from "react-router-dom"
import TopNav from "../components/TopNav"
import vegData from '../data/vegData.json'


const VegyInfo = () => {

  const { id } = useParams()
  const code = parseInt(id)
  

  const vegetable = vegData.find(item =>  item.code === code)
  
  console.log(vegData);
  console.log(vegetable);
  console.log(vegetable[0]);

  return (
    <div className="vegyInfo">
      <TopNav bool={true}  path={'/infoList'} title={`আদর্শ ${vegetable.name}`} />  
      <div className="custom-container mt-3">
        <div className="vegyimage d-flex flex-column justify-content-center align-items-center mb-2">
          <img src="https://via.placeholder.com/150x100/" alt="" />
          <p className="mt-2 fw-bold vegy-title" >{vegetable.name}</p>
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
                <td >{vegetable.height}</td>
                <td>{vegetable.width}</td>
                <td>{vegetable.color}</td>
                <td>{vegetable.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="collect-info">
        <p className="fw-bold fs-6 vegy-title mb-2" >সংগ্রহের দিকনির্দেশনা</p>
          <ul>
            <li>{vegetable.freshness}</li>
            <li>{vegetable.fruit_selection}</li>
            <li>{vegetable.maturity}</li>
            <li>{vegetable.pests_and_diseases}</li>
          </ul>


        </div>
      </div>
    </div>
  )
}
export default VegyInfo