import { useState } from "react";
import FormNav from "../components/FormNav";
import arrow from '../contents/arrow.svg'
import cross from '../contents/cross.svg'
import image_icon from '../contents/Image-icon.svg'
import vegData from '../data/vegData.json'

const Form = () => {
   
  const [page, setPage] = useState(1);
  const [vegetable, setVegetable] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [length, setLength] = useState('');
  const [width, seWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [phone, setPhone] = useState('')

  const handleNextPage = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    setPage(page - 1);
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
    console.log('Submitted:',  length, phone,vegetable,image.name);
    // Do something with the form data, like submit it to a server
  };

  const renderPageOne = () => {
    return (
      <div className="form">
        <FormNav arrow={arrow} title='সবজির নাম এবং ছবি যুক্ত করুন  ' />

        <div className="container">
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
    return (
      <div>
        <FormNav title='সবজির বিবরণ যুক্ত করুন' />
       <div className="container">
        <form onSubmit={handleNextPage}>
        <div className="form-input">
          <label>
            <input type="text" value={length} onChange={(e)=>setLength(e.target.value)} className="form-control" id="length" placeholder="সবজির দৈর্ঘ্য লেখুন"/>
          </label>
        </div>
        <div className="form-input">
          
          <label>
            <input type="text" value={width} onChange={(e)=>seWidth(e.target.value)} className="form-control" id="width" placeholder="সবজির প্রস্থ লেখুন"/>
          </label>
        </div>
        <div className="form-input">
          
          <label>
            <input type="text" value={weight} onChange={(e)=>setWeight(e.target.value)} className="form-control" id="weight" placeholder="সবজির ওজন লেখুন"/>
          </label>
        </div>

        <div className="form-input">
          <label>
            <textarea className="form-control" value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)} placeholder="অতিরিক্ত তথ্য লিখুন..." id="extraInfo"></textarea>
          </label>
        </div>
          <button className="btn-next" type="submit">পরবর্তি ধাপ</button>
          <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
        </form>
        </div>
      </div>
    );
  };

  const renderPageThree = () => {
    return (
      <div>
         <FormNav title='সবজির মান পরীক্ষা করুন' />
         <div className="container">
            <form onSubmit={handleSubmit}>

              <div className="question">
                <p>ফুলের গায়ে কোন দাগ, পচা চিহ্ন  আছে কি?</p>

                <div className="options">
                    <div className="option">
                      <input type="radio" id="yes" name="yes" value="yes"/>
                      <label for="yes">Yes</label>
                    </div>

                    <div className="option">
                      <input type="radio" id="no" name="no" value="no"/>
                      <label for="no">No</label>
                    </div>
                </div>
                
                

              </div>
            

              <label>
                Phone:
                <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} />
              </label>
              <button className="btn-next" type="submit">পরবর্তি ধাপ</button>
              <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
            </form>
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

    default:
      return renderPageOne();
  }
}
 
export default Form;