import { useState } from "react";
import { useNavigate } from "react-router-dom"
import FormNav from "../components/FormNav";
import FormQuestions from "../components/FormQuestions";
import arrow from '../contents/arrow.svg'
import cross from '../contents/cross.svg'
import image_icon from '../contents/imageIcon.svg'
import done_image from '../contents/done.svg'
import vegData from '../data/vegData.json'

const Form = () => {
  const navigate = useNavigate()
   
  const [page, setPage] = useState(parseInt(localStorage.getItem('pageNum'))?  parseInt(localStorage.getItem('pageNum')):1);
  const [vegetable, setVegetable] = useState('');
  const [, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [length, setLength] = useState('');
  const [width, seWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
 

  const handleNextPage = (e) => {
    e.preventDefault();
    setPage(page + 1);
    // localStorage.setItem("pageNum",page)

  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    setPage(page - 1);
    // localStorage.setItem("pageNum",page)
  };

  function handleFileUpload(e) {
    setImage(e.target.files[0])
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  }

  function handleRemoveFile() {
    setImage(null);
    setPreviewUrl(null);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(page + 1);
    
  };


  const handleRedirect = () => {
    localStorage.setItem("pageNum",1)
    window.location.reload(false)
    
  };


  const renderPageOne = () => {
    localStorage.setItem("pageNum",page)
    console.log('current page',page);
    console.log('saved page',localStorage.getItem('pageNum'));
    return (
      <div className="form">
        <FormNav firstPage={page} arrow={arrow} title='সবজির নাম এবং ছবি যুক্ত করুন  ' />

        <div className=" custom-container">
            <form onSubmit={handleNextPage}>

                <div className="select-container">
                    <select value={vegetable} onChange={(e)=>setVegetable(e.target.value)}>
                        {vegData.map((item) => (
                        <option key={item.code} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>

                { !previewUrl && (  <label className="upload-btn">

                          <div className="dot-border">
                            <img src={image_icon} alt="" />
                            <p> নতুন সবজির ছবি যুক্ত করুন</p>
                          </div>
                          
                    <input hidden type="file"   onChange={handleFileUpload} id="img" name="img" accept="image/*"/>
                </label>)}               



                {previewUrl && ( <div className="uploaded-image">
                        <img className="up-image" key={previewUrl} src={previewUrl} alt="vegetable"  />
                        <button ><img onClick={handleRemoveFile} src={cross} alt="" /></button>
                    </div>  )}



                <button className="btn-next" type="submit">পরবর্তি ধাপ</button>
              </form>
         </div>
        
      </div>
    );
  };

  const renderPageTwo = () => {
    localStorage.setItem("pageNum",page)
    console.log('current page',page);
    console.log('saved page',localStorage.getItem('pageNum'));
    return (
      <div>
        <FormNav handlePrevPage={handlePrevPage} arrow={arrow} title='সবজির বিবরণ যুক্ত করুন' />
       <div className="custom-container">
        <form onSubmit={handleNextPage}>
      
            <input type="text" value={length} onChange={(e)=>setLength(e.target.value)} id="length" placeholder="সবজির দৈর্ঘ্য লেখুন"/>

            <input type="text" value={width} onChange={(e)=>seWidth(e.target.value)} className="form-control" id="width" placeholder="সবজির প্রস্থ লেখুন"/>  

            <input type="text" value={weight} onChange={(e)=>setWeight(e.target.value)} className="form-control" id="weight" placeholder="সবজির ওজন লেখুন"/>

            <textarea className="form-control" value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)} placeholder="অতিরিক্ত তথ্য লিখুন..." id="extraInfo"></textarea>
     
       
          <button className="btn-next" type="submit">পরবর্তি ধাপ</button>
          <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
        </form>
        </div>
      </div>
    );
  };

  const renderPageThree = () => {
    localStorage.setItem("pageNum",page)
    console.log('current page',page);
    console.log('saved page',localStorage.getItem('pageNum'));
    return (
      <div>
         <FormNav handlePrevPage={handlePrevPage} arrow={arrow} title='সবজির মান পরীক্ষা করুন' />
         <div className="custom-container">
            <form onSubmit={handleSubmit}>
              <div className="questions">
                <FormQuestions question="ফুলের গায়ে কোন দাগ, পচা চিহ্ন  আছে কি?" />
                <FormQuestions question="ফুলের গায়ে কোন পোকামাকড় আছে কি?" />
                <FormQuestions question="ফুলের গায়ে কোন রোগাক্রান্ত এবং ভাঙ্গা আছে কি?" />

              </div>
              
            

              <button className="btn-next" type="submit">জমা দিন </button>
              <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
            </form>
         </div>
        
      </div>
    );
  };

  const renderPageFour = () => {
    
    return (
      <div>
         <FormNav title='সফলভাবে জমা দেওয়া হয়েছে!' />
         <div className="custom-container">
          <div className="done-section">
            <img src={done_image} alt="" />
            <p>সফলভাবে জমা দেওয়া হয়েছে!</p>
          </div>

          <button className="btn-next" onClick={handleRedirect}>নতুন সবজি যোগ করুন</button>
          <button className="btn-prev" onClick={() => {localStorage.setItem("pageNum",1); navigate('/')}}>হোমে ফিরে যান</button>
            
         </div>
      </div>
    );
  };

  switch (page) {
    case 1:
      return renderPageOne();

    case 2:
      return renderPageTwo();

    case 3:
      return renderPageThree();

    case 4:
      return renderPageFour();

    default:
      return renderPageOne();
  }
}
 
export default Form;