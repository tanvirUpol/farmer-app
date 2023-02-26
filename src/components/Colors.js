const Colors = ({ vegy, vegData, register }) => {

  const selectedVegy = vegData.find(item => item.name === vegy)
  const colors = selectedVegy.colors

  function addBorder(element) {
    // remove the "selected" class from all labels
    var labels = document.querySelectorAll('.custom-radio');
    labels.forEach(function (label) {
      label.classList.remove('selected');
    });
    // add the "selected" class to the label of the clicked radio button
    element.target.parentNode.classList.add('selected');
  }

  return (
    <div className="d-flex align-items-center justify-content-center my-4">
      <span>সবজির রঙ নির্বাচন করুন: </span>

      <div className="color-options" >
        {
          colors.map((item) => (

            <label style={{ backgroundColor: `${Object.values(item)[0]}` }} key={Object.keys(item)[0]} className="custom-radio" >
              <input hidden type="radio" name="options" value={Object.keys(item)[0]} onClick={addBorder} {...register('color', { required: true })} />
            </label>

          ))}

      </div>
    </div>

  )
}
export default Colors