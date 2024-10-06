import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';


const ShowDesigns = () => {
  const [designs, setDesigns] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/designs/${id}`)
      .then((response) => {
        setDesigns(response.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  // Convert Base64 string to Data URL
  const getBase64ImageUrl = (base64String) => {
    return `data:${designs.contentType};base64,${base64String}`;
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
          <div className='nav-dept'><Link to="/marketing"><img src='/marketing.png' className='icon' alt='marketing' />Marketing</Link></div>
          <div className='nav-dept'><Link to="/hr"><img src='/human-resource.png' className='icon' alt='hr' />Human Resource</Link></div>
          <div className='nav-dept'><Link to="/financial"><img src='/financial.png' className='icon' alt='financial' />Financial</Link></div>
          <div className='nav-dept'><Link to="/transport"><img src='/transport.png' className='icon' alt='transport' />Transport</Link></div>
        </nav>
      </div>


      {/* Design Details */}
      <div className="main-content">
        <header>
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
        </header>
        <div className='button-container'></div>
      <div className="main-content flex-1 p-6">
        <BackButton />
        <h1 className='text-3xl my-4'>Show Design Records</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div id="design-details-card" className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            {/* Display Image */}
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Design Image: </span>
              {designs.imageUrl ? (
                <img
                  src={getBase64ImageUrl(designs.imageUrl)}
                  alt={designs.DesignName}
                  className='w-64 h-auto border rounded-lg'
                  onError={(e) => e.target.src = 'path/to/default-image.png'}
                />
              ) : (
                <span>No Image Available</span>
              )}
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>ID: </span>
              <span>{designs._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Design ID: </span>
              <span>{designs.designId}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Size ID: </span>
              <span>{designs.sizeID}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Design Name: </span>
              <span>{designs.DesignName}</span>
            </div>

            {/* Other design fields */}
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 1: </span>
              <span>{designs.materialID1}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 1: </span>
              <span>{designs.qtyRequired1}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 2: </span>
              <span>{designs.materialID2}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 2: </span>
              <span>{designs.qtyRequired2}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 3: </span>
              <span>{designs.materialID3}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 3: </span>
              <span>{designs.qtyRequired3}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 4: </span>
              <span>{designs.materialID4}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 4: </span>
              <span>{designs.qtyRequired4}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 5: </span>
              <span>{designs.materialID5}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 5: </span>
              <span>{designs.qtyRequired5}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 6: </span>
              <span>{designs.materialID6}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 6: </span>
              <span>{designs.qtyRequired6}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Material ID 7: </span>
              <span>{designs.materialID7}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>QTY Required 7: </span>
              <span>{designs.qtyRequired7}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time: </span>
              <span>{new Date(designs.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Update Time: </span>
              <span>{new Date(designs.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ShowDesigns;
