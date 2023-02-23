import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='mt-5'>
            <h1 className='text-center fw-bold text-danger'>404 Not Found</h1>
            <Link to='/' className='text-decoration-none'><button className="btn-next mx-auto d-block w-50">Go Home</button></Link>
        </div>
    );
};

export default NotFound;