import logout from '../contents/logout.svg'
import camera_img from '../contents/TakePicture.svg'
import vegy_bag from '../contents/vegy.svg'
import carrot_img from '../contents/docsCarrot.svg'
import HomeSection from "../components/HomeSection"

const Home = () => {

    return (
        <div className='home custom-container'>
            {/* <div className="mt-4 row justify-content-between">
                <p  className="m-0 col-2">স্বাগতম</p>
                <div className="col-2 "><img className=" d-block" src={logout} alt="Your SVG" /></div>
            </div>
            <div className="row justify-content-between">
                <div className="col-4 " ><img className="ms-3 d-block" src={camera_img} alt="Your SVG" /></div>
                <div className="col-8">
                    <p className="font-size-12 fw-bold">সবজির তথ্য আপলোড করুন</p>
                    <button onClick={()=>navigate('/form')} >তথ্য আপলোড </button>
                </div>
            </div> */}


            <div className="top-bar">
                <p className="">স্বাগতম</p>
                <div className=""><img className="" src={logout} alt="Your SVG" /></div>
            </div>
            <div className="hero-section">
                <HomeSection img={camera_img} path='/form' btnText='তথ্য আপলোড' text='সবজির তথ্য আপলোড করুন' />
                <HomeSection img={vegy_bag} path='/form' btnText='এখানে পড়ুন' text='সবজির তথ্য সম্পর্কে পড়ুন' />
                <HomeSection img={carrot_img} path='/form' btnText='এখানে দেখুন' text='আপলোড করা সবজি দেখুন' />
            </div>
        </div>
    )
}
export default Home