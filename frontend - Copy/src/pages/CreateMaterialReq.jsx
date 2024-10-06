import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateMaterialReq = () => {
  const [designID, setDesignID] = useState('');
  const [sizeID, setSizeID] = useState('');
  const [materials, setMaterials] = useState([{ materialID: '', qtyRequired: '' }]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Add another material field
  const addMaterialField = () => {
    setMaterials([...materials, { materialID: '', qtyRequired: '' }]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = materials.map((material, i) => 
      i === index ? { ...material, [field]: value } : material
    );
    setMaterials(updatedMaterials);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!designID.trim()) newErrors.designID = 'Design ID is required';
    if (!sizeID.trim()) newErrors.sizeID = 'Size ID is required';
    
    materials.forEach((material, index) => {
      if (!material.materialID.trim()) newErrors[`materialID${index}`] = `Material ID ${index + 1} is required`;
      if (!material.qtyRequired.trim() || isNaN(material.qtyRequired) || parseFloat(material.qtyRequired) <= 0) {
        newErrors[`qtyRequired${index}`] = `QTY Required ${index + 1} must be a positive number`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDesign = () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('designID', designID);
    formData.append('sizeID', sizeID);
    
    materials.forEach((material, index) => {
      formData.append(`materialID${index + 1}`, material.materialID);
      formData.append(`qtyRequired${index + 1}`, material.qtyRequired);
    });

    setLoading(true);

    axios.post('http://localhost:5555/material-requirement', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console');
        console.error(error);
      });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar content here */}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
        </header>
        <div className='button-container'></div>

        <div className='main-content p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Create Material Requirement</h1>
          {loading && <Spinner />}

          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
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
              <label className='text-xl mr-4 text-gray-500'>Size ID</label>
              <input
                type='text'
                value={sizeID}
                onChange={(e) => setSizeID(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.sizeID && <p className='text-red-500'>{errors.sizeID}</p>}
            </div>

            {materials.map((material, index) => (
              <div key={index} className='my-4'>
                <label className='text-xl mr-4 text-gray-500'>Material ID {index + 1}</label>
                <input
                  type='text'
                  value={material.materialID}
                  onChange={(e) => handleMaterialChange(index, 'materialID', e.target.value)}
                  className='border-2 border-gray-500 px-4 py-2 w-full'
                />
                {errors[`materialID${index}`] && <p className='text-red-500'>{errors[`materialID${index}`]}</p>}

                <label className='text-xl mr-4 text-gray-500'>QTY Required {index + 1}</label>
                <input
                  type='text'
                  value={material.qtyRequired}
                  onChange={(e) => handleMaterialChange(index, 'qtyRequired', e.target.value)}
                  className='border-2 border-gray-500 px-4 py-2 w-full'
                />
                {errors[`qtyRequired${index}`] && <p className='text-red-500'>{errors[`qtyRequired${index}`]}</p>}
              </div>
            ))}

            <button onClick={addMaterialField} className='text-blue-500'>+ Add another material</button>

            <div className='mt-4'>
              <button onClick={handleSaveDesign} className='bg-blue-500 text-white px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMaterialReq;
