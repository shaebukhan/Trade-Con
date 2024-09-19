import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const Recruitment = () => {

    const { id } = useParams();

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
            name: "Management & Utilities",

        },
        {
            id: 5,
            name: "Security & Management",

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

    ];


    // Find the selected category's subcategories
    const category = jobCategories.find(cat => cat.id === parseInt(id));


    return (
        <>
            <Navbar />
            <div className="job-main-sec">
                <h2>{category.name}</h2>
                <div className="job-btns-main">
                    <div className="job-btns-left">
                        <button className='common-btn-job' >Post Job</button>
                    </div>
                    <div className="job-btns-right">
                        <button className='common-btn-job' >Seeking Job</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recruitment;