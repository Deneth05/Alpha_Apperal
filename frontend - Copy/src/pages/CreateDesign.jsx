import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateDesign = () => {
  const [designID, setDesignID] = useState('');
  const [DesignName, setDesignName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!designID.trim()) newErrors.designID = 'Design ID is required';
    if (!DesignName.trim()) newErrors.DesignName = 'Design Name is required';
    if (!imageFile) newErrors.imageFile = 'Image file is required';
    if (!description.trim()) newErrors.description = 'Description 1 is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };


  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSaveDesign = () => {
    if (!validateForm()) {
      return; 
    }
  
    // Create a FormData object
    const formData = new FormData();
    formData.append('designID', designID);
    formData.append('DesignName', DesignName);
    formData.append('imageFile', imageFile); 
    formData.append('description', description);
  
    setLoading(true);
  
    axios.post('http://localhost:5555/designs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console');
        console.log(error);
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
          <h1 className='text-3xl my-4'>Create Design Record</h1>
          {loading && <Spinner />}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            {/* Input fields */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Design ID</label>
              <input
                type='text'
                value={designID}
                onChange={(e) => setDesignID(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.designID && <p className='text-red-500'>{errors.designID}</p>}
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Design Name</label>
              <input
                type='text'
                value={DesignName}
                onChange={(e) => setDesignName(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.DesignName && <p className='text-red-500'>{errors.DesignName}</p>}
            </div>
            {/* Image Upload Field */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Upload Design Image</label>
              <input
                type='file'
                accept="image/*"
                onChange={handleImageChange}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.imageFile && <p className='text-red-500'>{errors.imageFile}</p>}

              {/* Image Preview */}
              {imagePreview && (
                <div className='mt-4'>
                  <img src={imagePreview} alt="Design Preview" className='w-64 h-auto border rounded-lg' />
                </div>
              )}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Description</label>
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.materialID1 && <p className='text-red-500'>{errors.materialID1}</p>}
            </div>
            <button
              onClick={handleSaveDesign}
              className='bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg'
            >
              Save Design Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDesign;
