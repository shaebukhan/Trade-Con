import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Recruitment = () => {

    const { id } = useParams();
    const [trade, setTrade] = useState("");
    // Fetch single trade data
    const getSingleTradesData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/trade/${id}`);
            if (data?.success) {
                setTrade(data.trade);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch trade data');
        }
    };

    // Fetch trades when component mounts
    useEffect(() => {

        getSingleTradesData();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="job-main-sec">
                <h2>{trade.trade}</h2>
                <div className="job-btns-main">
                    <div className="job-btns-left">
                        <button className='common-btn-job' >{trade.trade}  post job</button>
                    </div>
                    <div className="job-btns-right">
                        <button className='common-btn-job' >{trade.trade} seek job</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recruitment;