import logout from '../contents/logout.svg'
import camera_img from '../contents/TakePicture.svg'
import vegy_bag from '../contents/vegy.svg'
import carrot_img from '../contents/docsCarrot.svg'
import HomeSection from "../components/HomeSection"
import useAuth from '../hooks/useAuth'

const Home = () => {

    const { logOut } = useAuth()

    return (
        <div className='home custom-container'>

            <div className="top-bar  d-flex mt-3 align-items-center justify-content-between">
                <p className="ms-2 my-0 fw-bold fs-5">স্বাগতম</p>
                <div onClick={()=> logOut()} className="me-2"><img className="" src={logout} alt="Welcome SVG" /></div>
            </div>

            <div className="mt-4">
                <HomeSection img={camera_img} path='/form' btnText='তথ্য আপলোড' text='সবজির তথ্য আপলোড করুন' />
                <HomeSection img={vegy_bag} path='/infoList' btnText='এখানে পড়ুন' text='সবজির তথ্য সম্পর্কে পড়ুন' />
                <HomeSection img={carrot_img} path='/form' btnText='এখানে দেখুন' text='আপলোড করা সবজি দেখুন' />
            </div>

        </div>
    )
}
export default Home