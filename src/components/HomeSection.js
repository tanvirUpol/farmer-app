import { useNavigate } from "react-router-dom"

const HomeSection = ({ img, path, text, btnText }) => {

    const navigate = useNavigate()

    return (
        <div className="hero my-3 d-flex align-items-center justify-content-around p-3 rounded" onClick={() => navigate(path)} > 

                <img className="img-fluid" src={img} alt="hero viewer" />
            <div className="hero-info d-flex flex-column align-items-center gap-2">
                <p className="m-0">{text}</p>
                <button className="btn btn-primary px-5 py-2 rounded-1 border-0" onClick={() => navigate(path)}>{btnText} </button>
            </div>
        </div>
    );
}

export default HomeSection;