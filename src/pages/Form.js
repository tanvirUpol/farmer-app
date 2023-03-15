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
import Colors from "../components/Colors";

const Form = () => {

  const navigate = useNavigate()
  const { register, unregister, getValues,setValue, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth()
  const [vegy, setVegy] = useState(vegData[0].name)
  // const [page, setPage] = useState(parseInt(localStorage.getItem('pageNum')) ? parseInt(localStorage.getItem('pageNum')) : 1);
  const [page, setPage] = useState(parseInt(localStorage.getItem('pageNum')) ? parseInt(localStorage.getItem('pageNum')) : 1);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // eslint-disable-next-line
  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("vegetableData")))
  const [questions, setQuestions] = useState([])

  const [length,setLength] = useState('')
  const [width,setWidth] = useState('')
  const [weight,setWeight] = useState('')
  const [actualLength,setActualLength] = useState('')
  const [actualWidth,setActualWidth] = useState('')
  const [actualWeight,setActualWeight] = useState('')

  const handleNextPage = (data, e) => {
    e.preventDefault();
    
    localStorage.setItem("vegetableData", JSON.stringify(data));
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

  const onSubmit = data => {

    localStorage.removeItem("vegetableData")

    document.getElementById('final-submit').style.display = 'none'
    document.getElementById('form-submit-loader').style.display = 'block'
    
    // uploading image 
    // const image = e.target.files[0]

    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?&key=2533d5f3e441eb6b52c7bec740a8dd84`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(imageData => {

        if (imageData.status === 200) {
          const productDetails = {
            number: user.phone,
            name: data.vegetable,
            color: data.color,
            colorCode: data.colorCode,
            weight: data.weight,
            width: data.width,
            length: data.length,
            info: data.extraInfo,
            image: imageData.data.url,
            status: "বিচারাধীন",
            questions: questions,
            date: new Date().toISOString().split('T')[0]
          }

          fetch('https://efarmer.onrender.com/addProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
          })
            .then(response => response.json())
            .then(data => data.status === true && setPage(page + 1))
        }
      })
  };

  const handleRedirect = () => {
    localStorage.setItem("pageNum", 1)
    window.location.reload(false)
  };

  const appendQuestions = (question, answer) => {
    const obj = { questionName: question, answer: answer }

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

  const clearRegister = () => {
    unregister("question1");
    unregister("question2");
    unregister("question3");
  }

  function convertBanglaToEnglish(input) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    

    let englishNumber = '';

    for (let i = 0; i < input.length; i++) {
      const digit = input.charAt(i);
      const index = bengaliDigits.indexOf(digit);
      if (index !== -1) {
        englishNumber += englishDigits[index];
      } else {
        englishNumber += digit;
      }
    }
    englishNumber = parseFloat(englishNumber)

    if(!isNaN(englishNumber)){
        const value = englishNumber
        return value
    }
  }

  const handleInputValues = () => {
    setValue("length", actualLength)
    setValue("width", actualWidth)
    setValue("weight", actualWeight)
  }

  const renderPageOne = () => {

    localStorage.setItem("pageNum", page)

    return (
      <div>
        <TopNav bool={true} path={'/'} title='সবজির নাম এবং ছবি যুক্ত করুন  ' />

        <div className="custom-container">
          <form onSubmit={handleSubmit(handleNextPage)}>

            <div className="select-container">
              <select   {...register("vegetable", { onChange: (e) => { setVegy(e.target.value); setQuestions([]); clearRegister() }, required: true })}>

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

              <input hidden name="image" type="file" id="image" {...register("image", { onChange: (e) => { handleFileUpload(e) }, required: true })} accept="image/*" />

            </label>)}

            {errors.image && <span className="text-danger fw-bold m-1" >অবশ্যই একটি ছবি আপলোড করতে হবে*</span>}

            {previewUrl && (<div className="uploaded-image">
              <img className="up-image" key={previewUrl} src={previewUrl} alt="vegetable" />
              <button ><img onClick={handleRemoveFile} src={cross} alt="" /></button>
              <Colors getValues={getValues} vegy={vegy} vegData={vegData} register={register} errors={errors} />
              {errors.colorCode && <span className="text-danger fw-bold m-1 pt-5" >অনুগ্রহ করে সবজির রং বাছাই করুন*</span>}
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
    // const selectedVegy = vegData.find(item => item.name === vegy)

    localStorage.setItem("pageNum", page)

    return (
      <div>
        <TopNav bool={false} path={handlePrevPage} title='সবজির বিবরণ যুক্ত করুন' />
        <div className="custom-container">
          <form onSubmit={handleSubmit(handleNextPage)}>

            <input
              type="text"
              id="length" 
              placeholder="সবজির দৈর্ঘ্য লেখুন (সে.মি)" 
              value={length}
              {...register("length", 
              { onChange: (e)=>
                {
                setLength(e.target.value);
                setActualLength(convertBanglaToEnglish(e.target.value))
                },
                // required: true, max: `${selectedVegy.limits.maxLength}`, min: `${selectedVegy.limits.minLength}`,
                required: true,
                pattern: /[0-9০১২৩৪৫৬৭৮৯]+/i 
              })} 
              
            />
              <div>
                    {errors.length && errors.length.type === "required" && (<span className="text-danger fw-bold m-1" >অনুগ্রহ করে দৈর্ঘ্য টাইপ করুন*</span>)}
                    {/* {errors.length && errors.length.type === "max" && ( <span  className="text-danger fw-bold m-1" >সর্বোচ্চ পরিমাণ ছাড়িয়ে গেছে</span>)}
                    {errors.length && errors.length.type === "min" && ( <span  className="text-danger fw-bold m-1" >ন্যূনতম পরিমাণ অতিক্রম করেছে</span>)} */}
                    {errors.length && errors.length.type === "pattern" && ( <span className="text-danger fw-bold m-1" >অনুগ্রহ করে শুধুমাত্র সংখ্যা ইনপুট করুন*</span>)}
              </div>

            <input
              type="text"
              id="width" 
              placeholder="সবজির প্রস্থ লেখুন (সে.মি)" 
              value={width}
              {...register("width", 
              { onChange: (e)=>
                {
                setWidth(e.target.value);
                setActualWidth(convertBanglaToEnglish(e.target.value))
                },
                // required: true, max: `${selectedVegy.limits.maxWidth}`, min: `${selectedVegy.limits.minWidth}`,
                required: true, 
                pattern: /[0-9০১২৩৪৫৬৭৮৯]+/i 
              })} 
              
              />
              <div>
                    {errors.width && errors.width.type === "required" && (<span className="text-danger fw-bold m-1" >অনুগ্রহ করে প্রস্থ টাইপ করুন*</span>)}
                    {/* {errors.width && errors.width.type === "max" && ( <span  className="text-danger fw-bold m-1" >সর্বোচ্চ পরিমাণ ছাড়িয়ে গেছে</span>)}
                    {errors.width && errors.width.type === "min" && ( <span  className="text-danger fw-bold m-1" >ন্যূনতম পরিমাণ অতিক্রম করেছে</span>)} */}
                    {errors.width && errors.width.type === "pattern" && ( <span className="text-danger fw-bold m-1" >অনুগ্রহ করে শুধুমাত্র সংখ্যা ইনপুট করুন*</span>)}
              </div>

            <input
              type="text"
              id="weight" 
              placeholder="সবজির ওজন লেখুন (গ্রাম)" 
              value={weight}
              {...register("weight", 
              { onChange: (e)=>
                {
                setWeight(e.target.value);
                setActualWeight(convertBanglaToEnglish(e.target.value))
                },
                // required: true, max: `${selectedVegy.limits.maxWeight}`, min: `${selectedVegy.limits.minWeght}`,
                required: true,
                pattern: /[0-9০১২৩৪৫৬৭৮৯]+/i 
              })} 
              />
              <div>
                    {errors.weight && errors.weight.type === "required" && (<span className="text-danger fw-bold m-1" >অনুগ্রহ করে ওজন টাইপ করুন*</span>)}
                    {/* {errors.weight && errors.weight.type === "max" && ( <span  className="text-danger fw-bold m-1" >সর্বোচ্চ পরিমাণ ছাড়িয়ে গেছে</span>)}
                    {errors.weight && errors.weight.type === "min" && ( <span  className="text-danger fw-bold m-1" >ন্যূনতম পরিমাণ অতিক্রম করেছে</span>)} */}
                    {errors.weight && errors.weight.type === "pattern" && ( <span className="text-danger fw-bold m-1" >অনুগ্রহ করে শুধুমাত্র সংখ্যা ইনপুট করুন*</span>)}
              </div>
        




            <textarea  {...register("extraInfo", { required: false })} placeholder="অতিরিক্ত তথ্য লিখুন..." id="extraInfo"></textarea>

            <button className="btn-next" onClick={handleInputValues} type="submit" >পরবর্তি ধাপ</button>
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
              <FormQuestions appendQuestions={appendQuestions} errors={errors} vegy={vegy} vegData={vegData} register={register} question="ফুলের গায়ে কোন দাগ, পচা চিহ্ন  আছে কি?" />
            </div>

            <button className="btn-next" type="submit" >পরবর্তি ধাপ</button>
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
                  <td>{getValues("length") + ' সে মি'}</td>
                  <td>{getValues("width") + ' সে মি'}</td>
                  <td>{getValues("color")}</td>
                  <td>{getValues("weight") + ' গ্রাম'}</td>
                </tr>
              </tbody>

            </table>
            <div className="question-data w-100">
              {questions.map((item) => (

                <div key={item.questionName} className="question mt-2  p-3">
                  <p className="m-0">{item.questionName}</p>
                  <p className="m-0 fw-bold" style={{ color: '#279636' }}>{item.answer}</p>
                </div>
              ))}

            </div>

            <div id='final-submit' className="w-100">
              <button className="btn-next my-1" type="submit">জমা দিন</button>
              <button className="btn-prev mt-1" onClick={handlePrevPage}>আগের ধাপ</button>
            </div>

            <div style={{ display: 'none' }} id='form-submit-loader' className="w-100">
              <button className="btn-next" type="submit"><div className="spinner-border me-2" role="status" style={{ height: '20px', width: '20px', color: "white" }}></div>জমা হচ্ছে . . .</button>
            </div>

          </form>
        </div>
      </div>
    );
  };

  const renderPageFive = () => {

    localStorage.setItem("pageNum", page)

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