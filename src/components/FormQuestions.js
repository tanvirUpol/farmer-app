const FormQuestions = ({appendQuestionsLocal,appendLocal,vegData, register,errors,appendQuestions }) => {
  const pageThreeData = JSON.parse(localStorage.getItem("vegyInfo"))
  const selectedVegy = vegData.find(item =>  item.name===pageThreeData.vegetable )
  // const selectedVegy = vegData.find(item =>  item.name===vegy )
  const questions = selectedVegy.questions
  // console.log(pageThreeData);


  return (  <>

    {(Object.values(questions[0])[0]) &&(
      <div key={'question1'} className="question">
      <p>{Object.values(questions[0])[0]}</p>

      <div className="options">
        <div className="option">
          <input defaultChecked={pageThreeData.question1 === "হ্যাঁ" } type="radio" id="yes" {...register("question1", {onChange: (e) => { 
            appendQuestions('question1',(Object.values(questions[0])[0]),e.target.value); appendQuestionsLocal((Object.values(questions[0])[0]),e.target.value); }, required: true })} name={'question1'} value="হ্যাঁ" />
          <label htmlFor={'question1'}>হ্যাঁ</label>
        </div>

        <div className="option">
          <input defaultChecked={pageThreeData.question1 === "না" } type="radio" id="no" {...register("question1", { onChange: (e) => { 
            appendQuestions('question1',(Object.values(questions[0])[0]),e.target.value)
            appendQuestionsLocal((Object.values(questions[0])[0]),e.target.value); }, required: true })}  name={'question1'} value="না" />
          <label htmlFor={'question1'}>না</label>
        </div>
      {errors.question1 && <span className="text-danger fw-bold m-1" >প্রশ্নোর উত্তর দিন*</span>}
      </div>
    </div>)}

    {(Object.values(questions[1])[0]) &&(
      <div key={'question2'} className="question">
      <p>{Object.values(questions[1])[0]}</p>

      <div className="options">
        <div className="option">
          <input defaultChecked={pageThreeData.question2 === "হ্যাঁ" } type="radio" id="yes" {...register("question2", { onChange: (e) => { 
            appendQuestions('question2',(Object.values(questions[1])[0]),e.target.value);
            appendQuestionsLocal((Object.values(questions[1])[0]),e.target.value); }, required: true })} name={'question2'} value="হ্যাঁ" />
          <label htmlFor={'question2'}>হ্যাঁ</label>
        </div>

        <div className="option">
          <input defaultChecked={pageThreeData.question2 === "না" }  type="radio" id="no"  {...register("question2", {onChange: (e) => { 
            appendQuestions('question2',(Object.values(questions[1])[0]),e.target.value);
            appendQuestionsLocal((Object.values(questions[1])[0]),e.target.value); }, required: true })}  name={'question2'} value="না" />
          <label htmlFor={'question2'}>না</label>
        </div>
      {errors.question2 && <span className="text-danger fw-bold m-1" >প্রশ্নোর উত্তর দিন*</span>}
      </div>
    </div>)}


    {(Object.values(questions[2])[0]) &&(
      <div key={'question3'} className="question">
      <p>{Object.values(questions[2])[0]}</p>

      <div className="options">
        <div className="option">
          <input defaultChecked={pageThreeData.question3 === "হ্যাঁ" }  type="radio" id="yes" {...register("question3", { onChange: (e) => { 
            appendQuestions('question3',(Object.values(questions[2])[0]),e.target.value);
            appendQuestionsLocal((Object.values(questions[2])[0]),e.target.value); }, required: true })} name={'question3'} value="হ্যাঁ" />
          <label htmlFor={'question3'}>হ্যাঁ</label>
        </div>

        <div className="option">
          <input defaultChecked={pageThreeData.question3 === "না" }  type="radio" id="no"  {...register("question3", {onChange: (e) => { 
            appendQuestions('question3',(Object.values(questions[2])[0]),e.target.value); 
            appendQuestionsLocal((Object.values(questions[2])[0]),e.target.value);
            }, required: true })}  name={'question3'} value="না" />
          <label htmlFor={'question3'}>না</label>
        </div>
      {errors.question3 && <span className="text-danger fw-bold m-1" >প্রশ্নোর উত্তর দিন*</span>}
      </div>
    </div>)}

    

    </>
    )
   
  
}
export default FormQuestions