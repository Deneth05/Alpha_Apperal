import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BackButton from '../components/InventoryBackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { itemCode } = useParams();
  const [user, setUser] = useState(null); // State to store logged-in user

  useEffect(() => {
    // Retrieve user information from localStorage (or other source)
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Assuming user info is stored as JSON
    }

    if (!itemCode) {
      console.error("No itemCode provided in route parameters.");
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${itemCode}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [itemCode]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src='/company-logo.png' className='logo' alt='company-logo'></img>
        </div>
        <nav>
          <div className='nav-dept'><Link to="/home"><img src='/public/home.png' className='icon'></img>Home</Link></div>
          <div className='nav-dept'><Link to="/inventory/home"><img src='/public/inventory.png' className='icon'></img>Inventory</Link></div>
          <div className='nav-dept'><Link to="/"><img src='/public/tshirt.png' className='icon'></img>Design</Link></div>
          <div className='nav-dept'><Link to="/orders"><img src='/public/orders.png' className='icon'></img>Orders</Link></div>
          <div className='nav-dept'><Link to="/supplier"><img src='/public/supplier.png' className='icon'></img>Supplier</Link></div>
          <div className='nav-dept'><Link to="/marketing"><img src='/public/marketing.png' className='icon'></img>Marketing</Link></div>
          <div className='nav-dept'><Link to="/hr"><img src='/public/human-resource.png' className='icon'></img>Human Resource</Link></div>
          <div className='nav-dept'><Link to="/financial"><img src='/public/financial.png' className='icon'></img>Financial</Link></div>
          <div className='nav-dept'><Link to="/transport"><img src='/public/transport.png' className='icon'></img>Transport</Link></div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="flex justify-between items-center p-4">
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
          {user && (
            <div className="user-info">
              <span className="text-lg text-gray-700">Logged in as: {user.name}</span>
            </div>
          )}
        </header>
        <div className='button-container'></div>
        <div className='p-4'>
          <BackButton />
          <h1 className='text-3xl my-4 text-center'>View Product</h1>

          {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 max-w-md'>
              <div className='flex flex-col'>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Item Code:</span>
                  <span>{inventory.itemCode}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Product Name:</span>
                  <span>{inventory.productName}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Product Category:</span>
                  <span>{inventory.productCategory}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Selling Price:</span>
                  <span>{inventory.price}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Quantity:</span>
                  <span>{inventory.Quantity}  {inventory.unit}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
                  <span>{inventory.createdAt ? new Date(inventory.createdAt).toString() : 'N/A'}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
                  <span>{inventory.updatedAt ? new Date(inventory.updatedAt).toString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
