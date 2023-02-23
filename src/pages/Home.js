import logout from '../contents/logout.svg'
import camera_img from '../contents/TakePicture.svg'
import vegy_bag from '../contents/vegy.svg'
import carrot_img from '../contents/docsCarrot.svg'
import HomeSection from "../components/HomeSection"

const Home = () => {

    return (
        <div className='home custom-container'>

            <div className="top-bar">
                <p className="m-0">স্বাগতম</p>
                <div className=""><img className="" src={logout} alt="Your SVG" /></div>
            </div>
            <div className="hero-section">
                <HomeSection img={camera_img} path='/form' btnText='তথ্য আপলোড' text='সবজির তথ্য আপলোড করুন' />
                <HomeSection img={vegy_bag} path='/infoList' btnText='এখানে পড়ুন' text='সবজির তথ্য সম্পর্কে পড়ুন' />
                <HomeSection img={carrot_img} path='/form' btnText='এখানে দেখুন' text='আপলোড করা সবজি দেখুন' />
            </div>
        </div>
    )
}
export default Home