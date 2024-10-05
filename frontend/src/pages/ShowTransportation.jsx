import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

// Reusable component to display transport detail
const TransportDetail = ({ label, value }) => (
    <div className='my-2 flex justify-between w-full'>
        <span className='text-lg font-medium mr-4 text-gray-600'>{label}</span>
        <span className='text-lg'>{value}</span>
    </div>
);

const ShowTransport = () => {
    const [transport, setTransport] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/transport/${id}`)
            .then((response) => {
                setTransport(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="flex">
        {/* Sidebar */}
        <div className="sidebar w-1/5 p-4 bg-gray-100">
            <div className="brand mb-6">
                <img src='../../public/company-logo.png' className='logo' alt='company-logo' />
            </div>
            <nav>
                <div className='nav-dept mb-4'><Link to="/home"><img src='/public/home.png' className='icon' alt="home-icon"/>Home</Link></div>
                <div className='nav-dept mb-4'><Link to="/inventory"><img src='/public/inventory.png' className='icon' alt="inventory-icon"/>Inventory</Link></div>
                <div className='nav-dept mb-4'><Link to="/"><img src='/public/tshirt.png' className='icon' alt="design-icon"/>Design</Link></div>
                <div className='nav-dept mb-4'><Link to="/orders"><img src='/public/orders.png' className='icon' alt="orders-icon"/>Orders</Link></div>
                <div className='nav-dept mb-4'><Link to="/supplier"><img src='/public/supplier.png' className='icon' alt="supplier-icon"/>Supplier</Link></div>
                <div className='nav-dept mb-4'><Link to="/marketing"><img src='/public/marketing.png' className='icon' alt="marketing-icon"/>Marketing</Link></div>
                <div className='nav-dept mb-4'><Link to="/hr"><img src='/public/human-resource.png' className='icon' alt="hr-icon"/>Human Resource</Link></div>
                <div className='nav-dept mb-4'><Link to="/financial"><img src='/public/financial.png' className='icon' alt="financial-icon"/>Financial</Link></div>
                <div className='nav-dept mb-4'><Link to="/transport"><img src='/public/transport.png' className='icon' alt="transport-icon"/>Transport</Link></div>
            </nav>
        </div>

        {/* Main Content */}
        <div className="main-content w-4/5 p-6">
            <header className="mb-6">
                <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
            </header>

            <div className='button-container'>
            </div>


            <div className='min-h-screen flex flex-col'>

                <div className='p-4'>
                    <BackButton />
                    <h1 className='text-3xl font-semibold my-4 text-center font-bold text-dark-blue'>Show Transport</h1>
                </div>
                <div className='flex flex-grow justify-center items-center'>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className='w-full max-w-md border border-sky-400 rounded-xl p-4 bg-white shadow-lg bg-blue-300 bg-opacity-50'>
                            <TransportDetail label='Job' value={transport.job} />
                            <TransportDetail label='Vehicle' value={transport.vehicle} />
                            <TransportDetail label='Vehicle No' value={transport.vehicleNo} />
                            <TransportDetail label='DriverNIC' value={transport.driver} />
                            <TransportDetail label='Date' value={transport.date} />
                            <TransportDetail label='Time' value={transport.time} />
                            <TransportDetail label='Cost' value={transport.cost} />
                            <TransportDetail label='Destination' value={transport.destination} />
                        </div>
                    )}
                </div>
                </div>

           
        </div>
    </div>
    );
};

export default ShowTransport;
