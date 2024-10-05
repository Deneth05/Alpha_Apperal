import React, { useState } from 'react';
import BackButton2 from '../components/BackButton2';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';

const DeleteVehicle = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteVehicle = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/vehicle/${id}`)
            .then(() => {
                setLoading(false);
                alert('Successfully deleted');  // Add success alert
                navigate('/vehicle');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check the console.');
                console.log(error);
            });
    };

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




            <div className='min-h-screen flex flex-col justify-center items-center '> {/* Added min-h-screen and flex classes */}
        <div className='p-4'>
            <BackButton2 />
            <h1 className='text-xl my-4 font-bold text-dark-blue'>Delete Vehicle</h1>
            {loading && <Spinner />}
            <div className='flex flex-col items-center border-sky-400 rounded-xl w-[600px] p-8 mx-auto bg-red-200 bg-opacity-50'>
                <h3 className='text-2xl'>Are you sure you want to delete this vehicle?</h3>
    
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteVehicle}>
                    Yes, Delete it
                </button>
            </div>
        </div>
    
    

        </div>
        
        </div>
    </div>
    );
}

export default DeleteVehicle;
