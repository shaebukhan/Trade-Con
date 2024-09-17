import React from 'react';
import Navbar from '../components/Navbar';

const Recruitment = () => {
    return (
        <>
            <Navbar />
            <div className="job-main-sec">
                <h2>Recruitment</h2>
                <div className="job-btns-main">
                    <button className='common-btn-job' >Post Job</button>
                    <button className='common-btn-job' >Seeking Job</button>
                </div>
            </div>
        </>
    );
};

export default Recruitment;