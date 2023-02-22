import {useNavigate} from "react-router-dom"

const HomeSection = ({img,path,text,btnText}) => {
    
    const navigate = useNavigate()
    return (    <div className="hero">
                    <div className="hero-img" >
                        <img className="" src={img} alt="" />
                    </div>
                    <div className="hero-info">
                        <p className="">{text}</p>
                        <button onClick={()=>navigate(path)} >{btnText} </button>
                    </div>
                </div>
            );
}
 
export default HomeSection;