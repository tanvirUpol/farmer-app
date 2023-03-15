const Colors = ({ vegy, vegData, register,getValues }) => {
  const selectedVegy = vegData.find(item => item.name === vegy)
  // console.log(vegy);
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
    <div className="d-flex align-items-center justify-content-center mt-4">
      <span>রঙ নির্বাচন করুন: </span>

      <div className="color-options" >
        {colors.map((item) => (


          Object.values(item)[0] && (
            <label style={{ backgroundColor: `${Object.values(item)[0]}` }} key={Object.keys(item)[0]} className={`custom-radio ${getValues("colorCode")===Object.values(item)[0]?"selected":""}`} >
              <input hidden type="radio" name="options" value={Object.values(item)[0]} onClick={addBorder} {...register('colorCode', { required: true })} />
            </label>)


          ))}
          

      </div>
    </div>

  )
}
export default Colors