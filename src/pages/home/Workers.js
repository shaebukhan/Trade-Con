import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProfessionCard from '../../components/ProfessionCard';
import ProfessionImage from "../../assets/images/planning.png";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Chat from '../../components/Chat';
const Workers = () => {
    const { id } = useParams();
    // State to hold the selected category ID


    const jobCategories = [
        {
            id: 1,
            name: "Construction Trades",
            subcategories: [
                {
                    id: 1,
                    name: "Construction Trades",
                    professions: [
                        { id: 1, name: "Plumber", image: ProfessionImage },
                        { id: 2, name: "Carpenter", image: ProfessionImage },
                        { id: 3, name: "Painter", image: ProfessionImage },
                        { id: 4, name: "Plasterer", image: ProfessionImage },
                        { id: 5, name: "Tiler", image: ProfessionImage },
                        { id: 6, name: "Bricklayer & Blocklayer", image: ProfessionImage },
                        { id: 7, name: "Windows/Doors", image: ProfessionImage }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Mechanical/Vehicle Care",
            subcategories: [
                {
                    id: 2,
                    name: "Mechanical/Vehicle Care",
                    professions: [
                        { id: 1, name: "Vehicle Recovery", image: ProfessionImage },
                        { id: 2, name: "Valeting", image: ProfessionImage },
                        { id: 3, name: "Vehicle Cosmetics/Repair", image: ProfessionImage },
                        { id: 1, name: "Specialist Vehicle Services", image: ProfessionImage }
                    ]
                },

            ]
        },
        {
            id: 3,
            name: "Health/Beauty & Cosmetics",
            subcategories: [
                {
                    id: 4,
                    name: "Health/Beauty & Cosmetics",
                    professions: [
                        { id: 1, name: "Nails", image: ProfessionImage },
                        { id: 2, name: "Tan", image: ProfessionImage },
                        { id: 3, name: "Hair", image: ProfessionImage },
                        { id: 4, name: "Makeup", image: ProfessionImage }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: "Management & Utilities",
            subcategories: [
                {
                    id: 5,
                    name: "Management & Utilities",
                    professions: [
                        { id: 1, name: "home I.T", image: ProfessionImage },
                        { id: 2, name: "business I.T", image: ProfessionImage },
                        { id: 3, name: "sewers and drains", image: ProfessionImage },
                        { id: 4, name: "oil/ electricity/ gas", image: ProfessionImage },

                    ]
                }
            ]
        },
        {
            id: 5,
            name: "Security & Management",
            subcategories: [
                {
                    id: 6,
                    name: "Security & Management",
                    professions: [
                        { id: 1, name: "Property Management", image: ProfessionImage },
                        { id: 2, name: "Project Management", image: ProfessionImage },
                        { id: 3, name: "Home Security", image: ProfessionImage },
                        { id: 4, name: "Remote Security", image: ProfessionImage },
                        { id: 5, name: "Personal Security", image: ProfessionImage },

                    ]
                }
            ]
        },
        {
            id: 6,
            name: "Home & Garden",
            subcategories: [

                {
                    id: 8,
                    name: "Home Maintenance",
                    professions: [
                        { id: 1, name: "Window Cleaning", image: ProfessionImage },
                        { id: 2, name: "House Cleaner", image: ProfessionImage },
                        { id: 3, name: "Carpet Upholstery Cleaner", image: ProfessionImage },
                        { id: 4, name: "Home Security", image: ProfessionImage },
                        { id: 5, name: "Home Utilities", image: ProfessionImage },
                        { id: 6, name: "Pest Control", image: ProfessionImage },
                        { id: 7, name: "Tree Surgeon", image: ProfessionImage },
                        { id: 8, name: "Pet Services", image: ProfessionImage }
                    ]
                }
            ]
        },
        {
            id: 7,
            name: "General Labour",
            subcategories: [
                {
                    id: 9,
                    name: "General Labour",
                    professions: []
                }
            ]
        },
        {
            id: 8,
            name: "Farming & Animals",
            subcategories: [
                {
                    id: 10,
                    name: "Farming & Animals",
                    professions: [

                        { id: 11, name: "Specialist Farm Services", image: ProfessionImage },
                        { id: 12, name: "Veterinary", image: ProfessionImage },
                        { id: 13, name: "Animal Care", image: ProfessionImage },
                        { id: 14, name: "Pet Care", image: ProfessionImage },
                        { id: 15, name: "Horses and farriers", image: ProfessionImage },

                    ]
                },
            ]
        },
        {
            id: 9,
            name: "Engineering/Welding",
            subcategories: [
                {
                    id: 15,
                    name: "Engineering/Welding",
                    professions: [
                        { id: 16, name: "Welders", image: ProfessionImage },
                        { id: 17, name: "Planning/Consulting Engineers", image: ProfessionImage },
                        { id: 18, name: " Mechanical Engineers", image: ProfessionImage },
                        { id: 19, name: "Civil Engineers", image: ProfessionImage },
                        { id: 20, name: "General Engineering", image: ProfessionImage },
                        { id: 21, name: "Electrical engineers", image: ProfessionImage },
                        { id: 22, name: "Fabrication", image: ProfessionImage },

                    ]
                },

            ]
        },
        {
            id: 10,
            name: "Home Help/Baby Sitting",
            subcategories: [
                {
                    id: 23,
                    name: "Home Help/Baby Sitting",
                    professions: [
                        { id: 24, name: "Catering", image: ProfessionImage },
                        { id: 25, name: "Elderly Care", image: ProfessionImage },
                        { id: 26, name: "Child Sitter", image: ProfessionImage },
                        { id: 27, name: "Pet Sitter", image: ProfessionImage },
                        { id: 28, name: "Cleaner", image: ProfessionImage },
                    ]
                },
            ]
        },
        {
            id: 11,
            name: "Transport & Delivery",
            subcategories: [
                {
                    id: 25,
                    name: "Transport & Delivery",
                    professions: [
                        { id: 29, name: "Man with a Van", image: ProfessionImage },
                        { id: 30, name: "House Moving", image: ProfessionImage },
                        { id: 31, name: "General Transport", image: ProfessionImage },
                        { id: 32, name: "Taxi", image: ProfessionImage },
                        { id: 33, name: "Lift Share", image: ProfessionImage },

                    ]
                },
            ]
        },
        {
            id: 12,
            name: "Health, Beauty & Cosmetics",
            subcategories: [
                {
                    id: 30,
                    name: "Health, Beauty & Cosmetics",
                    professions: [
                        { id: 1, name: "Nails", image: ProfessionImage },
                        { id: 2, name: "Tan", image: ProfessionImage },
                        { id: 3, name: "Hair", image: ProfessionImage },
                        { id: 4, name: "Makeup", image: ProfessionImage },
                        { id: 5, name: "Lash & Eyebrow", image: ProfessionImage },
                        { id: 6, name: "Personal Shopper", image: ProfessionImage },
                        { id: 7, name: "Personal Trainer", image: ProfessionImage }
                    ]
                }
            ]
        }
    ];


    // Find the selected category's subcategories
    const category = jobCategories.find(cat => cat.id === parseInt(id));

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <Navbar />
            <div className="workers-main">
                {category ? (
                    category.subcategories && category.subcategories.length > 0 ? (
                        category.subcategories.map(subcategory => (
                            <div key={subcategory.id} className="slider-sub">
                                <h2 className='mb-4'>{subcategory.name}</h2>
                                {subcategory.professions && subcategory.professions.length > 0 ? (
                                    <Slider {...settings}>
                                        {subcategory.professions.map(profession => (
                                            <Link to={`/details`} key={profession.id}>
                                                <ProfessionCard image={profession.image} profession={profession.name} />
                                            </Link>
                                        ))}
                                    </Slider>
                                ) : (
                                    <p>No professions available</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <h2>No subcategories available</h2>
                    )
                ) : (
                    <p>Category not found</p>
                )}

            </div>
            <Chat />
        </>
    );
};

export default Workers;
