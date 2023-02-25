const FormQuestions = ({ register,question }) => {
  return (
    <div className="question">
      <p>{question}</p>

      <div className="options">
        <div className="option">
          <input type="radio" id="yes" {...register(question, { required: true })} name={question} value="yes" />
          <label htmlFor={question}>হ্যাঁ</label>
        </div>

        <div className="option">
          <input type="radio" id="no"  {...register(question, { required: true })}  name={question} value="no" />
          <label htmlFor={question}>না</label>
        </div>
      </div>
    </div>
  )
}
export default FormQuestions