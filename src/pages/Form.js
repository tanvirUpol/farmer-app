import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TopNav from "../components/TopNav";
import FormQuestions from "../components/FormQuestions";
import cross from '../contents/cross.svg'
import image_icon from '../contents/imageIcon.svg'
import done_image from '../contents/done.svg'
import vegData from '../data/vegData.json'
import { useForm } from 'react-hook-form'
import useAuth from "../hooks/useAuth";

const Form = () => {

  const navigate = useNavigate()
  const { register,unregister, getValues, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth()
  // eslint-disable-next-line
  const [vegy, setVegy] = useState(vegData[0].name)
  const [page, setPage] = useState(parseInt(localStorage.getItem('pageNum')) ? parseInt(localStorage.getItem('pageNum')) : 1);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(localStorage.getItem("imageData")? localStorage.getItem("imageData"):null);

  // eslint-disable-next-line
  const [questions, setQuestions] = useState([])

  const handleNextPage = (data, e) => {
    e.preventDefault();
    setPage(page + 1)
    
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    setPage(page - 1);
  };

  function handleFileUpload(e) {
    setImage(e.target.files[0])
    
    localStorage.setItem('newImage',e.target.files[0])

    const url = URL.createObjectURL(e.target.files[0])
    setPreviewUrl(url);
    // setValue("image", e.target);

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.addEventListener('load', () => {
      appendLocal('image',reader.result);
      localStorage.setItem("imageData", reader.result);
    });
    
  }

  function handleRemoveFile() {
    setImage(null);
    setPreviewUrl(null);
  }


  const onSubmit = data => {
    
      const newData = JSON.parse(localStorage.getItem('vegyInfo'))
      const Savedquestions = JSON.parse(localStorage.getItem('vegyQues')).questions
      // console.log(newData);
      // console.log( newData.image); //base64

      const productDetails = {
                // number: user.phone,
                name: newData.vegetable,
                color: newData.color,
                weight: newData.weight,
                width: newData.width,
                length: newData.length,
                info: newData.extraInfo?newData.extraInfo:'',
                // image: imageData.data.url,
                status: "বিচারাধীন",
                questions: Savedquestions,
                date: new Date().toISOString().split('T')[0]
              }
              
      console.log(productDetails);


      

      
    // document.getElementById('final-submit').style.display = 'none'
    // document.getElementById('form-submit-loader').style.display = 'block'
    // // uploading image 
    // // const image = e.target.files[0]
    // const formData = new FormData()
    // formData.append('image', image)
    // const url = `https://api.imgbb.com/1/upload?&key=2533d5f3e441eb6b52c7bec740a8dd84`
    // fetch(url, {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(response => response.json())
    //   .then(imageData => {

    //     if (imageData.status === 200) {
    //       const productDetails = {
    //         number: user.phone,
    //         name: data.vegetable,
    //         color: data.color,
    //         weight: data.weight,
    //         width: data.width,
    //         length: data.length,
    //         info: data.extraInfo,
    //         image: imageData.data.url,
    //         status: "বিচারাধীন",
    //         questions: questions,
    //         date: new Date().toISOString().split('T')[0]
    //       }

    //       fetch('https://efarmer.herokuapp.com/addProduct', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(productDetails)
    //       })
    //         .then(response => response.json())
    //         .then(data => data.status === true && setPage(page + 1))
    //     }
    //   })
  };

  const handleRedirect = () => {
    localStorage.setItem("pageNum", 1)
    window.location.reload(false)
  };

  const appendQuestions = (qKey,question, answer) => {
    const obj = { questionName: question, answer: answer }
    appendLocal(qKey, answer);
    
    const index = questions.findIndex(item => item.questionName === obj.questionName);
    if (index !== -1) {
      // if object exists in array, overwrite it
      const newArr = [...questions];
      newArr[index] = obj;
      setQuestions(newArr);
    } else {
      // if object doesn't exist in array, append it
      setQuestions(prevArr => [...prevArr, obj]);
      
    }

  }

  const appendQuestionsLocal = (questionName, answer) => {
    const localStorageObj = JSON.parse(localStorage.getItem('vegyQues')) || {};
    const questionsArr = localStorageObj.questions || [];
  
    let updatedQuestionsArr = questionsArr.filter((questionObj) => {
      return questionObj.questionName !== questionName;
    });
  
    updatedQuestionsArr.push({ questionName, answer });
    localStorageObj.questions = updatedQuestionsArr;
  
    localStorage.setItem('vegyQues', JSON.stringify(localStorageObj));
  };
  

  const deleteLocal = (key) => {
    const localStorageObj = JSON.parse(localStorage.getItem('vegyInfo')) || {};
  
    if (localStorageObj.hasOwnProperty(key)) {
      delete localStorageObj[key];
      localStorage.setItem('vegyInfo', JSON.stringify(localStorageObj));
    }
  }

  const clearRegister = () => {
    unregister("question1");
    unregister("question2");
    unregister("question3");
    localStorage.removeItem("vegyQues");

    const keysToDelete = ['question1', 'question2', 'question3'];

    keysToDelete.forEach((key) => {
      deleteLocal(key);
    });

  }

  const appendLocal = (key,val) =>{
    const localStorageObj = JSON.parse(localStorage.getItem('vegyInfo')) || {};

    localStorageObj[key] = val;
    localStorage.setItem('vegyInfo', JSON.stringify(localStorageObj));
  }



  const renderPageOne = () => {

    localStorage.setItem("pageNum", page)
    const pageOneData = JSON.parse(localStorage.getItem("vegyInfo"))
   

    
    return (
      <div>
        <TopNav bool={true} path={'/'} title='সবজির নাম এবং ছবি যুক্ত করুন  ' />

        <div className="custom-container">
          <form onSubmit={handleSubmit(handleNextPage)}>

            <div className="select-container">
              <select defaultValue={pageOneData?pageOneData.vegetable:""}   {...register("vegetable", { onChange: (e) => { setVegy(e.target.value); setQuestions([]); clearRegister(); appendLocal('vegetable',e.target.value);  }, required: true })}>

                {vegData.map((item) => (
                  <option key={item.code} value={item.name}>{item.name}</option>
                ))}
              </select>
              {errors.vegetable && <span className="text-danger fw-bold m-1" >ঘরটি অবশ্যই পূরণ করতে হবে*</span>}

            </div>

            {!previewUrl && <label className="upload-btn">

              <div className="dot-border">
                <img src={image_icon} alt="add new" />
                <p>নতুন সবজির ছবি যুক্ত করুন</p>
              </div>

              <input hidden name="image" type="file" id="image" {...register("image", { onChange: (e) => { handleFileUpload(e) }, required: true })} accept="image/*" />

            </label>}

            {errors.image && <span className="text-danger fw-bold m-1" >অবশ্যই একটি ছবি আপলোড করতে হবে*</span>}

            { previewUrl && (<div className="uploaded-image">
              <img className="up-image" key={previewUrl} src={previewUrl} alt="vegetable" />
              <button ><img onClick={handleRemoveFile} src={cross} alt="" /></button>
              <input defaultValue={pageOneData?pageOneData.color:""} name="color" type="text" {...register("color", { onChange: (e) =>{appendLocal('color', e.target.value);}, required: true })} id="color" placeholder="সবজির রং লেখুন" />
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
    const pageTwoData = JSON.parse(localStorage.getItem("vegyInfo"))


    return (
      <div>
        <TopNav bool={false} path={handlePrevPage} title='সবজির বিবরণ যুক্ত করুন' />
        <div className="custom-container">
          <form onSubmit={handleSubmit(handleNextPage)}>

            <input 
            type="text" 
            // type="number" 
            // step='0.01' 
            defaultValue={pageTwoData? pageTwoData.length: ''}
            {...register("length", { onChange: (e) =>{appendLocal('length', e.target.value);}, required: true })} id="length" placeholder="সবজির দৈর্ঘ্য লেখুন" />
            {errors.length && <span className="text-danger fw-bold m-1" >অনুগ্রহ করে দৈর্ঘ্য টাইপ করুন*</span>}

            <input 
            type="text" 
            // type="number" 
            // step='0.01' 
            defaultValue={pageTwoData? pageTwoData.width: ''}
             {...register("width", {onChange: (e) =>{appendLocal('width', e.target.value);}, required: true })} id="width" placeholder="সবজির প্রস্থ লেখুন" />
            {errors.width && <span className="text-danger fw-bold m-1">অনুগ্রহ করে প্রস্থ টাইপ করুন*</span>}

            <input 
            type="text" 
            // type="number" 
            // step='0.01' 
            defaultValue={pageTwoData? pageTwoData.weight: ''}
            {...register("weight", {onChange: (e) =>{appendLocal('weight', e.target.value);}, required: true })} id="weight" placeholder="সবজির ওজন লেখুন" />
            {errors.weight && <span className="text-danger fw-bold m-1">অনুগ্রহ করে ওজন টাইপ করুন*</span>}
            <textarea defaultValue={pageTwoData? pageTwoData.extraInfo: ''}  {...register("extraInfo", {onChange: (e) =>{appendLocal('extraInfo', e.target.value);}, required: false })} placeholder="অতিরিক্ত তথ্য লিখুন..." id="extraInfo"></textarea>

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
          <form onSubmit={handleSubmit(handleNextPage)}>
            <div className="questions">
              <FormQuestions appendQuestionsLocal={appendQuestionsLocal} appendQuestions={appendQuestions} errors={errors} appendLocal={appendLocal} vegData={vegData} register={register} question="ফুলের গায়ে কোন দাগ, পচা চিহ্ন  আছে কি?" />
            </div>

            <button className="btn-next" type="submit">পরবর্তি ধাপ</button>
            <button className="btn-prev" onClick={handlePrevPage}>আগের ধাপ</button>
          </form>
        </div>
      </div>
    );
  };

  const renderPageFour = () => {

    localStorage.setItem("pageNum", page)
    const questions =  (JSON.parse(localStorage.getItem('vegyQues')).questions)
    const pageFourData = JSON.parse(localStorage.getItem("vegyInfo"))
  

    

    return (
      <div >
        <TopNav bool={false} path={handlePrevPage} title={getValues("vegetable")} />
        <div className="custom-container">
          <form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit(onSubmit)}>
            <img className="up-image m-1" style={{ height: '100px', width: '150px' }} key={previewUrl} src={previewUrl} alt="vegetable" />
            <table className="table text-center table-bordered m-2">
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
                  <td>{pageFourData.length + ' সে মি'}</td>
                  <td>{pageFourData.width + ' সে মি'}</td>
                  <td>{pageFourData.color}</td>
                  <td>{pageFourData.weight + ' গ্রাম'}</td>
                </tr>
              </tbody>
              
            </table>
            <div className="question-data w-100">
            {questions.map((item)=>(
             
              <div key={item.questionName} className="question mt-2  p-3">
                  <p className="m-0">{item.questionName}</p>
                  <p className="m-0 fw-bold" style={{ color: '#279636'}}>{item.answer}</p>
              </div>
            ))}  
                
            </div>
            <button id='final-submit' className="btn-next m-1" type="submit">জমা দিন</button>
            <button style={{ display: 'none' }} id='form-submit-loader' className="btn-next" type="submit">জমা হচ্ছে ...</button>
            <button className="btn-prev mt-1" onClick={handlePrevPage}>আগের ধাপ</button>
          </form>
        </div>

      </div>
    );
  };

  const renderPageFive = () => {
    localStorage.setItem("pageNum", page)
    localStorage.removeItem("imageData")
    return (
      <div>
        <TopNav bool={true} path={null} title='সফলভাবে জমা দেওয়া হয়েছে' />
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

    case 5:
      return renderPageFive();

    default:
      return renderPageOne();
  }
}

export default Form;