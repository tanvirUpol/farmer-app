const FormQuestions = ({question}) => {
  return (
    <div className="question">
                <p>{question}</p>

                <div className="options">
                    <div className="option">
                      <input type="radio" id="yes" name={question} value="yes"/>
                      <label htmlFor={question}>হ্যাঁ</label>
                    </div>

                    <div className="option">
                      <input type="radio" id="no" name={question} value="no"/>
                      <label htmlFor={question}>না</label>
                    </div>
                </div>
    </div>
  )
}
export default FormQuestions