import { useNavigate } from "react-router-dom"

const HomeSection = ({ img, path, text, btnText }) => {

    const navigate = useNavigate()

    return (
        <div className="hero" onClick={() => navigate(path)}  >
            <div className="hero-img" >
                <img className="img-fluid" src={img} alt="hero viewer" />
            </div>
            <div className="hero-info">
                <p className="m-0">{text}</p>
                <button onClick={() => navigate(path)}>{btnText} </button>
            </div>
        </div>
    );
}

export default HomeSection;