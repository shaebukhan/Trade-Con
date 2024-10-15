import React, { useEffect, useState } from 'react';
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import ProfessionImage from "../assets/images/planning.png";
import jobCategories from "../data.json";
import axios from 'axios';

const HomeSec = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [trades, setTrades] = useState([]);
    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Fetch all trades data from the server
    const getAllTradesData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/trade/m-trades`);
            if (data?.success) {
                setTrades(data?.trades);

            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch trades when component mounts
    useEffect(() => {
        getAllTradesData();
    }, []);




    return (
        <>
            <div className="home-sec-left-sec-main">
                <div className="home-sec-left-sec-main-card">Help & Feedback</div>
                <div onClick={toggleDropdown} className="home-sec-left-sec-main-card position-relative">List yourself
                    {isOpen && (
                        <div className="dropdown-menu-sub " style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fff' }}>
                            <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                                {trades.map((trade) => (
                                    <li key={trade._id} > <Link to={`/workers/${trade._id}`} className="nav-link">{trade.trade}</Link></li>
                                ))}

                            </ul>
                        </div>
                    )}
                </div>


                <div className="home-sec-left-sec-main-card">Advertise</div>
                <div className="home-sec-left-sec-main-card">Dashboard</div>
            </div>
            <div className="home-sec-main">
                <div className="home-sec-left">

                    <div className="trade-person">
                        <h2 className="trade-person-title">Find A TradesPerson</h2>
                        <div className="jobs-trade-main">
                            {trades.map((category) => (
                                <div className="job-trade" key={category._id}>
                                    <Link to={`/workers/${category._id}`}>
                                        <span className="job-trade-text">{category.trade}</span>
                                        <span className="job-trade-icon">
                                            <HiArrowSmRight />
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="home-sec-right">
                    <h2 className="trade-person-title">Recruitment</h2>
                    <div className="jobs-trade-main">

                        {trades.map((job) => (
                            <div className="job-trade" key={job._id}>
                                <Link to={`/recruitment/${job._id}`}>
                                    <span className='job-trade-text'>Jobs</span>
                                    <span className='job-trade-icon'><HiArrowSmRight /></span>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSec;