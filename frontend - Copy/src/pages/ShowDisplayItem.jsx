import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const ShowDisplayItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/items/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  // Convert Base64 string to Data URL (if necessary)
  const getBase64ImageUrl = (base64String) => {
    return `data:${item.contentType};base64,${base64String}`;
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src="/company-logo.png" className='logo' alt='company-logo' />
        </div>
        <nav>
          {/* Navigation Links */}
          <div className='nav-dept'><Link to="/home"><img src='/home.png' className='icon' alt='home' />Home</Link></div>
          <div className='nav-dept'><Link to="/inventory/home"><img src='/inventory.png' className='icon' alt='inventory' />Inventory</Link></div>
          <div className='nav-dept'><Link to="/"><img src='/tshirt.png' className='icon' alt='design' />Design</Link></div>
          <div className='nav-dept'><Link to="/orders"><img src='/orders.png' className='icon' alt='orders' />Orders</Link></div>
          <div className='nav-dept'><Link to="/supplier"><img src='/supplier.png' className='icon' alt='supplier' />Supplier</Link></div>
          <div className='nav-dept'><Link to="/discounts/home"><img src='/marketing.png' className='icon' alt='marketing' />Marketing</Link></div>
          <div className='nav-dept'><Link to="/hr"><img src='/human-resource.png' className='icon' alt='hr' />Human Resource</Link></div>
          <div className='nav-dept'><Link to="/financial"><img src='/financial.png' className='icon' alt='financial' />Financial</Link></div>
          <div className='nav-dept'><Link to="/transport"><img src='/transport.png' className='icon' alt='transport' />Transport</Link></div>
        </nav>
      </div>

      {/* Item Details */}
      <div className="main-content">
        <header>
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
        </header>
        <div className='button-container'></div>
        <div className="main-content flex-1 p-6">
          <BackButton />
          <h1 className='text-3xl my-4'>Show Item Records</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div id="item-details-card" className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
              {/* Display Image */}
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Item Image: </span>
                {item.image ? (
                  <center>
                    <img
                      src={item.image} // Directly use the base64 string or image URL
                      alt={item.itemName || 'Item Image'}
                      className="w-full h-auto border border-gray-500 rounded"
                    />
                  </center>
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>ID: </span>
                <span>{item._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Item Code: </span>
                <span>{item.itemCode}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Item Name: </span>
                <span>{item.itemName}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Description: </span>
                <span>{item.description}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Create Time: </span>
                <span>{new Date(item.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Update Time: </span>
                <span>{new Date(item.updatedAt).toString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDisplayItem;
