import React, { useEffect, useState } from 'react';
import TopNav from '../components/TopNav';
import filterImage from '../contents/filter.svg'
import useAuth from '../hooks/useAuth';

const PreviousUploadedList = () => {

    const { user } = useAuth()

    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`https://efarmer.onrender.com/products/${user.phone}`)
            .then(response => response.json())
            .then(data => {
                setList(data.result)
                // console.log(data)b
            })
    }, [user.phone])

    return (
        <div className=''>
            <TopNav bool={true} path={'/'} title='সকল সবজি' />

            <div style={{ backgroundColor: '#279636', borderRadius: '5px', color: 'white' }} className="d-flex justify-content-around align-items-center mt-3 p-2 custom-container">
                <div className="col-4 text-center">সবজি</div>
                <div className="col-4 text-center">তারিখ <img src={filterImage} alt="click to filter" /> </div>
                <div className="col-4 text-center">অবস্থা <img src={filterImage} alt="click to filter" /> </div>
            </div>

            {
                list.length > 0 ?
                    list.map(item =>
                        <div key={item._id} style={{ border: "1px solid #898A8D", borderRadius: '5px', fontSize: '12px' }} className="d-flex justify-content-around align-items-center mt-3 custom-container p-2">
                            <div className="col-4 text-center">{item.name}</div>
                            {/* <div className="col-4 text-center">{new Date(item.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/(\d+)/g, (match, digit) => String.fromCharCode(digit.charCodeAt(0) + 2486))}</div> */}
                            <div className="col-4 text-center">{new Date(item.date).toLocaleDateString("bn-BD", { dateStyle: 'full' })}</div>
                            {
                                item.status === 'বিচারাধীন' && <div style={{ color: '#DE5D1D' }} className="col-4 text-center">{item.status}</div>
                            }
                            {
                                item.status === 'সম্পন্ন' && <div style={{ color: '#279636' }} className="col-4 text-center">{item.status}</div>
                            }
                            {
                                item.status === 'গৃহীত' && <div style={{ color: '#279636' }} className="col-4 text-center fw-bold">{item.status}</div>
                            }
                        </div>
                    )
                    :
                    <p className='my-5 text-center fw-bold text-danger fs-6'>আপনি এখনো কোনো সবজি আপলোড করেন নি</p>
            }
        </div>
    );
};

export default PreviousUploadedList;