import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TopNav from "../components/TopNav";
import FormQuestions from "../components/FormQuestions";
import cross from '../contents/cross.svg'
import image_icon from '../contents/imageIcon.svg'
import done_image from '../contents/done.svg'
import vegData from '../data/vegData.json'
import { useForm } from 'react-hook-form'



const Form = () => {
  const navigate = useNavigate()
 
  const { register, handleSubmit, formState: { errors }  } = useForm();
   // eslint-disable-next-line
  const [vegy,setVegy] = useState(vegData[0].name)
  const [page, setPage] = useState(parseInt(localStorage.getItem('pageNum')) ? parseInt(localStorage.getItem('pageNum')) : 1);
  // eslint-disable-next-line
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
 

  const handleNextPage = (val,e) => {
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

    // uploading image 
    // const image = e.target.files[0]
    // const formData = new FormData()
    // formData.append('image', image)
    // const url = `https://api.imgbb.com/1/upload?expiration=600&key=2533d5f3e441eb6b52c7bec740a8dd84`
    // fetch(url, {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(response => response.json())
    //   .then(imageData => {
    //     console.log(imageData);
    //   })
  }

  function handleRemoveFile() {
    setImage(null);
    setPreviewUrl(null);
  }

  const onSubmit = data => {
    console.log(data)
    console.log("submitted data")
    setPage(page + 1);
  };

  const handleRedirect = () => {
    localStorage.setItem("pageNum", 1)
    window.location.reload(false)

  };

  


  const renderPageOne = () => {
    localStorage.setItem("pageNum", page)

 
    return (
      <div>
        <TopNav bool={true} path={'/'} title='সবজির নাম এবং ছবি যুক্ত করুন  ' />

        <div className="custom-container">
          <form onSubmit={handleSubmit(handleNextPage)}>

            <div className="select-container">
              <select   {...register("vegetable",{onChange: (e) => {setVegy(e.target.value)}, required: true })}>
                
                {vegData.map((item) => (
                  <option key={item.code} value={item.name}>{item.name}</option>
                ))}
              </select>
              {errors.vegetable && <span className="text-danger fw-bold m-1" >ঘরটি অবশ্যই পূরণ করতে হবে*</span>}
           
            </div>

            {!previewUrl && (<label className="upload-btn">

              <div className="dot-border">
                <img src={image_icon} alt="add new" />
                <p>নতুন সবজির ছবি যুক্ত করুন</p>
              </div>

              <input hidden name="image" type="file"  id="image" {...register("image", {onChange: (e) => {handleFileUpload(e)}, required: true })}  accept="image/*" />
              
            </label>)}
            
            {errors.image && <span className="text-danger fw-bold m-1" >অবশ্যই একটি ছবি আপলোড করতে হবে*</span>}

            {previewUrl && (<div className="uploaded-image">
              <img className="up-image" key={previewUrl} src={previewUrl} alt="vegetable" />
              <button ><img onClick={handleRemoveFile} src={cross} alt="" /></button>
              <input name="color" type="text" {...register("color", { required: true })} id="color" placeholder="সবজির রং লেখুন" />
            {errors.color && <span className="text-danger fw-bold m-1" >অনুগ্রহ করে সবজির রং টাইপ করুন*</span>}
            </div>)}

            
           

          


            <button className="btn-next" type="submit" >পরবর্তি ধাপ</button>
          </form>
        </div>

      </div>
    );
  };

  const renderPageTwo = () => {
    localStorage.setItem("pageNum", page)

    return (
      <div>
        <TopNav bool={false} path={handlePrevPage} title='সবজির বিবরণ যুক্ত করুন' />
        <div className="custom-container">
          <form onSubmit={handleSubmit(handleNextPage)}>

            <input  type="number" {...register("length", { required: true })} id="length" placeholder="সবজির দৈর্ঘ্য লেখুন" />
            {errors.length && <span className="text-danger fw-bold m-1" >অনুগ্রহ করে দৈর্ঘ্য টাইপ করুন*</span>}
           
            <input type="number" {...register("width", { required: true })}  id="width" placeholder="সবজির প্রস্থ লেখুন" />
            {errors.width && <span className="text-danger fw-bold m-1">অনুগ্রহ করে প্রস্থ টাইপ করুন*</span>}
           
            <input type="number" {...register("weight", { required: true })}  id="weight" placeholder="সবজির ওজন লেখুন" />
            {errors.weight && <span className="text-danger fw-bold m-1">অনুগ্রহ করে ওজন টাইপ করুন*</span>}
            <textarea  {...register("extraInfo", { required: false })} placeholder="অতিরিক্ত তথ্য লিখুন..." id="extraInfo"></textarea>

            <button className="btn-next" type="submit" >পরবর্তি ধাপ</button>
            <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
          </form>
        </div>
      </div>
    );
  };

  const renderPageThree = () => {
    localStorage.setItem("pageNum", page)
    return (
      <div>
        <TopNav bool={false} path={handlePrevPage} title='সবজির মান পরীক্ষা করুন' />
        <div className="custom-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="questions">
              <FormQuestions errors={errors} vegy={vegy} vegData={vegData} register={register} question="ফুলের গায়ে কোন দাগ, পচা চিহ্ন  আছে কি?" />
            </div>
            <button className="btn-next" type="submit">জমা দিন</button>
            <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
          </form>
        </div>

      </div>
    );
  };

  const renderPageFour = () => {
    localStorage.setItem("pageNum", page)
    return (
      <div>
        <TopNav bool={true} path={null} title='সফলভাবে জমা দেওয়া হয়েছে!' />
        <div className="custom-container">
          <div className="done-section">
            <img src={done_image} alt="success" />
            <p>সফলভাবে জমা দেওয়া হয়েছে!</p>
          </div>

          <button className="btn-next" onClick={handleRedirect}>নতুন সবজি যোগ করুন</button>
          <button className="btn-prev" onClick={() => { localStorage.setItem("pageNum", 1); navigate('/') }}>হোমে ফিরে যান</button>

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