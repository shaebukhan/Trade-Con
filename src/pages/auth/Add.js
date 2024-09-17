import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import Loader from '../../components/Loader';
import Rating from 'react-rating-stars-component';

const Add = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0); // For star rating
    const [auth, setAuth] = useAuth();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!name || !profession || !image || !video) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("profession", profession);
        formData.append("image", image);
        formData.append("video", video);
        formData.append("rating", rating); // Add rating to formData

        setLoading(true);

        try {
            // Send POST request to backend
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/review/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                // Success message
                toast.success("Data added successfully!");

                // Clear the form after submission
                setName("");
                setProfession("");
                setImage(null);
                setVideo(null);
                setRating(0); // Reset rating
                navigate("/dashboard/admin");
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            // Error handling
            console.log(error);

            toast.error("Failed to add data. Please try again.");
        } finally {
            setLoading(false); // Hide loader
        }
    };

    const isLoggedIn = auth.token;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to login if no token
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Navbar />
            {loading && <Loader />}
            <div className="mt-top"></div>
            <div className="m-h-100">
                <div className="container pt-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <form className='p-3' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Profession</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    placeholder="Profession"
                                />
                            </div>
                            <div className="mb-3">
                                <label>Image Thumbnail</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    accept='image/*'
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Video</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    accept='video/*'
                                    onChange={(e) => setVideo(e.target.files[0])}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Ratings</label>
                                <Rating
                                    count={5}
                                    value={rating}
                                    onChange={(newRating) => setRating(newRating)} // Corrected handler
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Add Data</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;
