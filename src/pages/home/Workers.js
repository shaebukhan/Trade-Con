import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProfessionCard from '../../components/ProfessionCard';
import ProfessionImage from "../../assets/images/planning.png";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Chat from '../../components/Chat';
import NavS from '../../components/NavS';
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
                        { id: 7, name: "Windows & Doors", image: ProfessionImage },
                        { id: 8, name: "General builders", image: ProfessionImage },
                        { id: 9, name: "HVAC", image: ProfessionImage },
                        { id: 10, name: "Groundworkers", image: ProfessionImage },
                        { id: 11, name: "Insulation", image: ProfessionImage },
                        { id: 12, name: "Concrete works", image: ProfessionImage },
                        { id: 13, name: "Health & Safety", image: ProfessionImage },
                        { id: 14, name: "Stone mason  ", image: ProfessionImage },
                        { id: 15, name: " Energy", image: ProfessionImage },
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
                        { id: 4, name: "Specialist Vehicle Services", image: ProfessionImage },
                        { id: 5, name: "Auto Electrician", image: ProfessionImage },
                        { id: 6, name: "Car Mechanic", image: ProfessionImage },
                        { id: 7, name: "HGV mechanic  ", image: ProfessionImage },
                        { id: 7, name: "Vehicle tuning ", image: ProfessionImage },
                        { id: 7, name: "Performance", image: ProfessionImage },
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
                        { id: 1, name: "Nail Techs", image: ProfessionImage },
                        { id: 2, name: "Tan", image: ProfessionImage },
                        { id: 3, name: "Hair dresser / barber", image: ProfessionImage },
                        { id: 4, name: "Make-Up Artist", image: ProfessionImage },
                        { id: 5, name: "Beautician", image: ProfessionImage },
                        { id: 6, name: " Holistic & massage Therapists", image: ProfessionImage },

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
                        { id: 2, name: "Business I.T", image: ProfessionImage },
                        { id: 3, name: "Sewers and drains", image: ProfessionImage },
                        { id: 4, name: "Oil/ electricity/ gas", image: ProfessionImage },
                        { id: 5, name: "Facilities management", image: ProfessionImage },
                        { id: 6, name: "Project Management", image: ProfessionImage },
                        { id: 7, name: "Event planners", image: ProfessionImage },

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
                        { id: 2, name: "Facility management ", image: ProfessionImage },
                        { id: 3, name: "Home Security", image: ProfessionImage },
                        { id: 4, name: "Remote Security", image: ProfessionImage },
                        { id: 5, name: "Personal Security", image: ProfessionImage },
                        { id: 6, name: "Locksmiths", image: ProfessionImage },

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
                        { id: 8, name: "Pet Services", image: ProfessionImage },
                        { id: 9, name: "Powerwashing & roof and gutters", image: ProfessionImage },
                        { id: 10, name: "Landscaping and Gardening", image: ProfessionImage },
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
                        { id: 16, name: "Farm Contractors", image: ProfessionImage },
                        { id: 17, name: "Farm equipment techs", image: ProfessionImage },

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

    const [searchResults, setSearchResults] = useState([]);
    // Find the selected category's subcategories
    const category = jobCategories.find(cat => cat.id === parseInt(id));


    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            const results = jobCategories.flatMap(category =>
                category.subcategories.flatMap(subcategory =>
                    subcategory.professions.filter(profession =>
                        profession.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);  // Reset if no search term
        }
    };

    return (
        <>
            <NavS onSearch={handleSearch} />
            <div className="workers-main">
                {searchResults.length > 0 ? (
                    // Show search results
                    <div className="profession-grid">
                        {searchResults.map((profession) => (
                            <Link to={`/details`} key={profession.id}>
                                <ProfessionCard image={profession.image} profession={profession.name} />
                            </Link>
                        ))}
                    </div>
                ) : category ? (
                    // Show professions from the selected category
                    category.subcategories && category.subcategories.length > 0 ? (
                        category.subcategories.map(subcategory => (
                            <div key={subcategory.id} className="subcategory-section">
                                <h2 className="mb-4">{subcategory.name}</h2>
                                <div className="profession-grid">
                                    {subcategory.professions.map(profession => (
                                        <Link to={`/details`} key={profession.id}>
                                            <ProfessionCard image={profession.image} profession={profession.name} />
                                        </Link>
                                    ))}
                                </div>
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
