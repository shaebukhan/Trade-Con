import React from 'react';
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
const HomeSec = () => {

    const jobCategories = [
        {
            id: 1,
            name: "Construction Trades",
            subcategories: [
                {
                    id: 1,
                    name: "Construction Trades",
                }
            ]
        },
        {
            id: 2,
            name: "Mechanical/Vehicle Care",

        },
        {
            id: 3,
            name: "Health/Beauty & Cosmetics",

        },
        {
            id: 4,
            name: "Management",

        },
        {
            id: 5,
            name: "Utilities",

        },
        {
            id: 6,
            name: "Home & Garden",

        },
        {
            id: 7,
            name: "General Labour",

        },
        {
            id: 8,
            name: "Farming & Animals",

        },
        {
            id: 9,
            name: "Engineering/Welding",

        },
        {
            id: 10,
            name: "Home Help/Baby Sitting",

        },
        {
            id: 11,
            name: "Transport & Delivery",

        },
        {
            id: 12,
            name: "Health, Beauty & Cosmetics",

        }
    ];


    return (
        <>
            <div className="home-sec-main">
                <div className="home-sec-left">
                    <div className="home-sec-left-sec-main">
                        <div className="home-sec-left-sec-main-card"></div>
                        <div className="home-sec-left-sec-main-card"></div>
                        <div className="home-sec-left-sec-main-card"></div>
                        <div className="home-sec-left-sec-main-card"></div>
                    </div>
                    <div className="trade-person">
                        <h2 className="trade-person-title">Find A TradesPerson</h2>
                        <div className="jobs-trade-main">
                            {jobCategories.map((category) => (
                                <div className="job-trade" key={category.id}>
                                    <Link to={`/workers/${category.id}`}>
                                        <span className="job-trade-text">{category.name}</span>
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
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>

                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>
                        <div className="job-trade">
                            <Link to="/recruitment">
                                <span className='job-trade-text'>Jobs</span><span className='job-trade-icon'><HiArrowSmRight /></span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeSec;