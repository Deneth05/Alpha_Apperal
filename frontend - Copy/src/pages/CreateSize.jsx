import React, { useState } from 'react';
import BackButton from '../components/SizeBackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateSize = () => {
  const [sizeID, setSizeID] = useState('');
  const [sizeName, setSizeName] = useState('');
  const [chestMeasurement, setChestMeasurement] = useState('');
  const [waistMeasurement, setWaistMeasurement] = useState('');
  const [hipMeasurement, setHipMeasurement] = useState('');
  const [length, setLength] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!sizeID.trim()) newErrors.sizeID = 'Size ID is required';
    if (!sizeName.trim()) newErrors.DesignName = 'Size Name is required';
    if (!chestMeasurement.trim() || isNaN(chestMeasurement) || parseFloat(chestMeasurement) <= 0)
      newErrors.chestMeasurement = 'Chest Measurement must be a positive number';
    if (!waistMeasurement.trim() || isNaN(waistMeasurement) || parseFloat(waistMeasurement) <= 0)
      newErrors.waistMeasurement = 'Waist Measurement must be a positive number';
    if (!hipMeasurement.trim() || isNaN(hipMeasurement) || parseFloat(hipMeasurement) <= 0)
      newErrors.hipMeasurement = 'Hip Measurement must be a positive number';
    if (!length.trim() || isNaN(length) || parseFloat(length) <= 0)
      newErrors.length = 'Length must be a positive number';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };



  const handleSaveSize = () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
  
    // Create a JSON object
    const data = {
      sizeID,
      sizeName,
      chestMeasurement: parseFloat(chestMeasurement),
      waistMeasurement: parseFloat(waistMeasurement),
      hipMeasurement: parseFloat(hipMeasurement),
      length: parseFloat(length)
    };
  
    setLoading(true);
  
    // Send the JSON data with axios
    axios.post('http://localhost:5555/sizes', data, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        setLoading(false);
        navigate('/sizes/home');
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error:', error);
        alert('An error occurred. Please check the console');
      });
  };
  

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
        <img src='../public/company-logo.png' className='logo' alt='company-logo'></img>
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
        <header>
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
        </header>
        <div className='button-container'>
        </div>

        <div className='main-content p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Create Size Record</h1>
          {loading && <Spinner />}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            {/* Input fields */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Size ID</label>
              <input
                type='text'
                value={sizeID}
                onChange={(e) => setSizeID(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.sizeID && <p className='text-red-500'>{errors.sizeID}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Size Name</label>
              <input
                type='text'
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.sizeName && <p className='text-red-500'>{errors.sizeName}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Chest Measurement</label>
              <input
                type='text'
                value={chestMeasurement}
                onChange={(e) => setChestMeasurement(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.chestMeasurement && <p className='text-red-500'>{errors.chestMeasurement}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Waist Measurement</label>
              <input
                type='text'
                value={waistMeasurement}
                onChange={(e) => setWaistMeasurement(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.waistMeasurement && <p className='text-red-500'>{errors.waistMeasurement}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Hip Measurement</label>
              <input
                type='text'
                value={hipMeasurement}
                onChange={(e) => setHipMeasurement(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.hipMeasurement && <p className='text-red-500'>{errors.hipMeasurement}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>length</label>
              <input
                type='text'
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.length && <p className='text-red-500'>{errors.length}</p>}
            </div>
            <button
              onClick={handleSaveSize}
              className='bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg'
            >
              Save Size Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSize;
