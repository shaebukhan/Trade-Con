import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaStar } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Input, Select, Checkbox, Form, message, Pagination, Typography } from 'antd';

// const { } = Typography;
const Details = () => {
    const { id } = useParams();
    const [subTrade, setSubTrade] = useState("");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [city, setCity] = useState("");
    const [workersData, setWorkersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const { Title, Paragraph, Text } = Typography;
    // Calculate start and end index of items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Paginated data
    const currentWorkers = workersData.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleTermsChange = (e) => {
        if (e.target.checked) {
            setIsTermsModalVisible(true);
        }
    };
    const getCityFromGeoLocation = (setCity) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Call Nominatim API for reverse geocoding
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                        const data = await response.json();

                        // Get the city or display name from the API response
                        const city = data.address.city || data.address.town || data.address.village || "Location not found";
                        setCity(city);
                    } catch (error) {
                        message.error("Failed to fetch location name");
                    }
                },
                () => {
                    message.error("Failed to fetch location");
                }
            );
        } else {
            message.error("Geolocation is not supported by this browser.");
        }
    };

    // Fetch single trade data
    const getSingleSubTradesData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/sub-trade/sub-trade/${id}`);
            if (data?.success) {
                setSubTrade(data.subTrade);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch trade data');
        }
    };

    // Fetch trades when component mounts
    useEffect(() => {
        getSingleSubTradesData();
    }, [id]);

    const getAllWorkersData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/sub-trade/get-workers/${id}`);
            if (data?.success) {
                setWorkersData(data.workerSpecial);


            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch trade data');
        }
    };

    // Fetch trades when component mounts
    useEffect(() => {
        getAllWorkersData();
    }, [id]);

    const handleAddTrade = () => {
        setIsAddModalVisible(true);
    };
    const handleTermsAccept = () => {
        setIsTermsModalVisible(false);
    };
    const handleAddSubmit = async (values) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/sub-trade/add-workers`, {
                id,
                companyName: values.companyName,
                location: city, // Use the city fetched from geolocation
                experience: values.experience,
                email: values.email,
                phone: values.phone,
                services: [values.service1, values.service2, values.service3, values.service4, values.service5, values.service6],
                reviews: values.reviews,
                terms: values.terms,
                notifications: values.notifications
            });

            if (response.data.success) {
                message.success(response.data.message);
                form.resetFields();
                setIsAddModalVisible(false);
                getAllWorkersData();

            } else {
                message.error(response.data.message);


            }

        } catch (error) {
            console.error(error);
            message.error("An error occurred while listing the trade");
        }
    };


    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <Navbar />
                <button className='list-youself' onClick={handleAddTrade}>List Yourself</button>
            </div>

            <Modal
                open={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddSubmit} layout="vertical">
                    <h3>List Yourself</h3>

                    <Form.Item
                        label="Name or Company name"
                        name="companyName"
                        rules={[{ required: true, message: 'Please enter company name' }]}
                    >
                        <Input placeholder="Enter company name" />
                    </Form.Item>

                    <Form.Item label="Location">
                        <button
                            className='list-youself'
                            type="button"
                            onClick={() => getCityFromGeoLocation(setCity)}
                        >
                            Get Current Location
                        </button>
                        {city && <h5 className='mt-2'>Nearest City: {city}</h5>}
                    </Form.Item>

                    <Form.Item
                        label="Level of Experience"
                        name="experience"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select experience level">
                            <Select.Option value="qualified">Qualified</Select.Option>
                            <Select.Option value="experienced">Experienced</Select.Option>
                            <Select.Option value="new">New</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Contact Detail (Email)"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Contact Detail (Phone)"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>

                    <Form.Item label="List Six Services You Provide">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Form.Item
                                key={i}
                                name={`service${i}`}
                                rules={[{ required: true, message: `Please enter service ${i}` }]}
                            >
                                <Input placeholder={`Service ${i}`} />
                            </Form.Item>
                        ))}
                    </Form.Item>

                    <Form.Item
                        label="Agree to Customer Reviews"
                        name="reviews"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select">
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="terms"
                        valuePropName="checked"
                        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must accept the terms and conditions') }]}
                    >
                        <Checkbox onChange={handleTermsChange}>
                            I have read and accepted the terms and conditions
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Allow Push Notifications"
                        name="notifications"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select">
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        List Yourself
                    </Button>
                </Form>
            </Modal>

            {/* Modal for Terms and Conditions */}
            <Modal

                open={isTermsModalVisible}
                closable={false}
                footer={[
                    <Button key="accept" type="primary" onClick={handleTermsAccept}>
                        Accept
                    </Button>,
                ]}
                width={800}
            >
                <div className="terms-content">
                    <Title level={2}>
                        Terms and Conditions for Tradespeople Listing on trade conX
                    </Title>
                    <Text type="secondary">Last Updated: 02/10/24</Text>

                    <Paragraph>
                        These Terms and Conditions ("Terms") govern your use of the
                        services provided by trade conX ("we", "us", or "our"), an online
                        platform that lists tradespeople and their services. By listing
                        your details on our platform, you agree to comply with and be bound
                        by these Terms. If you do not agree to these Terms, you may not
                        proceed with listing your details on the platform.
                    </Paragraph>

                    <Paragraph>
                        Please read these Terms carefully before using our services. We
                        reserve the right to modify these Terms at any time without prior
                        notice. Any changes will be posted on our website, and by continuing
                        to use the platform, you agree to the updated Terms.
                    </Paragraph>

                    <hr />

                    <Title level={3}>1. Eligibility</Title>
                    <Paragraph>
                        By agreeing to these Terms, you confirm that:
                    </Paragraph>
                    <ul>
                        <li>You are at least 18 years old.</li>
                        <li>
                            You have the legal authority to enter into these Terms either on
                            your own behalf or as a representative of the business you list.
                        </li>
                        <li>
                            The details and information you provide are accurate, truthful,
                            and up-to-date.
                        </li>
                    </ul>

                    <hr />

                    <Title level={3}>2. Services Provided</Title>
                    <Paragraph>
                        trade conX allows tradespeople to list their personal and professional
                        details, including but not limited to:
                    </Paragraph>
                    <ul>
                        <li>Name</li>
                        <li>Phone number</li>
                        <li>Email address</li>
                        <li>Business details and professional qualifications</li>
                        <li>Service offerings and pricing (optional)</li>
                    </ul>
                    <Paragraph>
                        This platform enables potential customers ("Users") to contact you
                        directly for services or quotes.
                    </Paragraph>

                    <hr />

                    <Title level={3}>3. Data Collection and Privacy</Title>
                    <Paragraph>
                        By listing your details, you consent to the collection and use of
                        your personal and business information as outlined below.
                    </Paragraph>

                    <Title level={4}>3.1. Personal Information</Title>
                    <ul>
                        <li>
                            You agree that we may collect, store, and process the personal
                            information you provide, including your name, phone number,
                            email address, and any other relevant business information.
                        </li>
                        <li>
                            You confirm that you have the necessary consent to provide any
                            personal information of others (such as additional contact
                            persons) if you include them in your listing.
                        </li>
                    </ul>

                    <Title level={4}>3.2. Use of Personal Information</Title>
                    <ul>
                        <li>
                            We may share your personal and business details with Users of our
                            platform and relevant third-party advertisers.
                        </li>
                        <li>
                            We will only share your personal information with third parties to
                            the extent necessary to provide, enhance, or promote the services
                            available on the platform.
                        </li>
                        <li>
                            We will not sell your personal information to third-party
                            companies for purposes unrelated to the services provided by our
                            platform.
                        </li>
                    </ul>

                    <Title level={4}>3.3. Data Security</Title>
                    <Paragraph>
                        While we take reasonable steps to safeguard your information, no
                        system is completely secure. You acknowledge and agree that we are
                        not liable for any unauthorized access to or alteration of your
                        personal information.
                    </Paragraph>

                    <hr />

                    <Title level={3}>4. Sharing Information with Third Parties</Title>
                    <Paragraph>
                        We reserve the right to share your information with:
                    </Paragraph>
                    <ul>
                        <li>
                            Users of the platform, to facilitate communication for potential
                            service inquiries.
                        </li>
                        <li>
                            Third-party advertisers for marketing purposes related to the
                            services you provide.
                        </li>
                        <li>
                            Third-party service providers who assist us in operating the
                            platform, such as payment processors, marketing agencies, and
                            technical support.
                        </li>
                    </ul>
                    <Paragraph>
                        We will not share your information with any party for purposes
                        unrelated to the operation, enhancement, or marketing of our
                        platform, except as required by law (e.g., responding to legal
                        requests, enforcing Terms, or protecting the rights of trade conX
                        or others).
                    </Paragraph>

                    <hr />

                    <Title level={3}>5. Accuracy of Information</Title>
                    <Paragraph>
                        You are responsible for ensuring that the information provided in
                        your listing is accurate and up-to-date. Should any of your details
                        change, you agree to update them on the platform as soon as
                        possible.
                    </Paragraph>
                    <Paragraph>
                        Trade conX reserves the right to remove or suspend your listing at
                        any time if we suspect that the information provided is inaccurate,
                        outdated, misleading, or fraudulent.
                    </Paragraph>

                    <hr />

                    <Title level={3}>6. Intellectual Property</Title>
                    <Paragraph>
                        You retain ownership of any content (e.g., business descriptions,
                        photos) you upload to the platform, but you grant trade conX a
                        non-exclusive, worldwide, royalty-free license to use, display,
                        reproduce, and distribute this content for the purposes of
                        operating and promoting the platform.
                    </Paragraph>

                    <hr />

                    <Title level={3}>7. Liability</Title>
                    <Title level={4}>7.1. Limitation of Liability</Title>
                    <ul>
                        <li>
                            trade conX provides a platform for listing tradespeople and does
                            not take responsibility for the quality of services offered by
                            tradespeople listed on the platform.
                        </li>
                        <li>
                            You acknowledge that trade conX is not liable for any damages
                            arising from interactions, agreements, or disputes between you
                            and Users of the platform.
                        </li>
                        <li>
                            In no event shall trade conX, its employees, affiliates, or
                            service providers be liable for any indirect, incidental,
                            special, or consequential damages arising from your use of the
                            platform.
                        </li>
                    </ul>

                    <Title level={4}>7.2. Indemnification</Title>
                    <Paragraph>
                        You agree to indemnify and hold trade conX harmless from any claims,
                        damages, liabilities, costs, or expenses (including legal fees)
                        arising out of or related to:
                    </Paragraph>
                    <ul>
                        <li>Your use of the platform.</li>
                        <li>
                            Any dispute between you and a User or third party.
                        </li>
                        <li>
                            Your violation of these Terms or any applicable laws.
                        </li>
                    </ul>

                    <hr />

                    <Title level={3}>8. Termination</Title>
                    <Paragraph>
                        We reserve the right to suspend or terminate your listing at any
                        time, with or without cause, and with or without notice. You may
                        also request to remove your listing at any time by contacting us
                        through the platform.
                    </Paragraph>
                    <Paragraph>
                        Upon termination, any licenses granted by you to us under these Terms
                        will terminate, but any provision of these Terms that, by its nature,
                        should survive termination (including but not limited to limitations
                        on liability, indemnity, and intellectual property rights) will
                        continue to apply.
                    </Paragraph>

                    <hr />

                    <Title level={3}>9. Governing Law</Title>
                    <Paragraph>
                        These Terms are governed by the laws of the Republic of Ireland. You
                        agree that any disputes arising from your use of the platform or
                        these Terms shall be resolved in the courts located within the
                        Republic of Ireland, without regard to conflict of laws principles.
                    </Paragraph>

                    <hr />

                    <Title level={3}>10. Dispute Resolution</Title>
                    <Paragraph>
                        In the event of any dispute, claim, or controversy arising out of or
                        relating to these Terms, the parties agree to first seek to resolve
                        the issue through good faith negotiation. If negotiation fails, the
                        dispute shall be settled through binding arbitration under the rules
                        of arbitration.
                    </Paragraph>

                    <hr />

                    <Title level={3}>11. Compliance with International Laws</Title>
                    <Paragraph>
                        If you are using the platform from outside the jurisdiction of the
                        Republic of Ireland, you are responsible for complying with any
                        local laws that may apply to your use of the platform. We make no
                        representations that the platform is appropriate for use in any
                        particular jurisdiction.
                    </Paragraph>

                    <hr />

                    <Title level={3}>12. Contact Information</Title>
                    <Paragraph>
                        For any questions or concerns about these Terms or the services
                        provided by trade conX, please contact us at:
                    </Paragraph>
                    <ul>
                        <li>Email:</li>
                        <li>Phone:</li>
                    </ul>

                    <hr />

                    <Title level={3}>13. Acceptance of Terms</Title>
                    <Paragraph>
                        By creating a listing and using our platform, you confirm that you
                        have read, understood, and agreed to be bound by these Terms. If you
                        do not agree to these Terms, you must not use the platform.
                    </Paragraph>

                    <hr />

                    <Title level={4}>trade conX</Title>
                    <Paragraph>
                        Garland Graigue Killenaule Co. Tipperary.
                        <br />
                        Republic of Ireland
                    </Paragraph>

                    <Paragraph type="secondary">
                        Please note that this document provides general guidelines. It is
                        recommended that you seek legal advice to ensure compliance with
                        all relevant international, regional, and local laws.
                    </Paragraph>
                </div>
            </Modal>

            <div className="details-sub-main">
                <h3 className='mb-5'>{subTrade.profession}</h3>
                <div className="details-sub">
                    {currentWorkers && currentWorkers.length > 0 ? (
                        currentWorkers.map((work) => (
                            <div className="details-card" key={work._id}>
                                <h6 className='details-card-title'>{work.companyName}</h6>
                                <ul className='d-card-ul'>
                                    {work.services.map((service, index) => (
                                        <li key={index}>{service}</li>
                                    ))}
                                </ul>

                                {/* Conditionally show stars if reviews is 'yes' */}
                                {work.reviews === 'yes' && (
                                    <div className="stars-main">
                                        <FaStar className='details-star' />
                                        <FaStar className='details-star' />
                                        <FaStar className='details-star' />
                                        <FaStar className='details-star' />
                                        <FaStar className='details-star' />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-data-message mt-4">
                            <h2>No professionals available</h2>
                        </div>
                    )}
                </div>

                {/* Pagination Component */}
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={workersData.length}
                    onChange={handlePageChange}
                    className="mt-4"
                />
            </div>
        </>
    );
};

export default Details;
