import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditDesigns = () => {
  const [designID, setDesignID] = useState('');
  const [sizeID, setSizeID] = useState('');
  const [DesignName, setDesignName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [materialIDs, setMaterialIDs] = useState(Array(7).fill(''));
  const [qtyRequired, setQtyRequired] = useState(Array(7).fill(''));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Added errors state
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/designs/${id}`)
      .then((response) => {
        const designData = response.data;
        console.log('Design Data:', designData);

        setDesignID(designData.designID);
        setSizeID(designData.sizeID);
        setDesignName(designData.DesignName);
        setImageUrl(designData.imageUrl);
        setMaterialIDs([
          designData.materialID1, 
          designData.materialID2, 
          designData.materialID3, 
          designData.materialID4, 
          designData.materialID5, 
          designData.materialID6, 
          designData.materialID7
        ]);
        setQtyRequired([
          designData.qtyRequired1, 
          designData.qtyRequired2, 
          designData.qtyRequired3, 
          designData.qtyRequired4, 
          designData.qtyRequired5, 
          designData.qtyRequired6, 
          designData.qtyRequired7
        ]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console');
        console.log(error);
      });
  }, [id]);

  const handleEditSales = () => {
    const data = {
      designID,
      sizeID,
      DesignName,
      imageUrl,
      materialID1: materialIDs[0],
      qtyRequired1: parseFloat(qtyRequired[0]),
      materialID2: materialIDs[1],
      qtyRequired2: parseFloat(qtyRequired[1]),
      materialID3: materialIDs[2],
      qtyRequired3: parseFloat(qtyRequired[2]),
      materialID4: materialIDs[3],
      qtyRequired4: parseFloat(qtyRequired[3]),
      materialID5: materialIDs[4],
      qtyRequired5: parseFloat(qtyRequired[4]),
      materialID6: materialIDs[5],
      qtyRequired6: parseFloat(qtyRequired[5]),
      materialID7: materialIDs[6],
      qtyRequired7: parseFloat(qtyRequired[6]),
    };

    setLoading(true);

    axios.put(`http://localhost:5555/designs/${id}`, data)
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
        <img src="/company-logo.png" className='logo' alt='company-logo'></img>
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
        <div className='button-container'></div>
        <div className='p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Edit Design Record</h1>
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
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Image Url</label>
              <input
                type='text'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.imageUrl && <p className='text-red-500'>{errors.imageUrl}</p>}
            </div>
            {materialIDs.map((materialID, index) => (
              <React.Fragment key={index}>
                <div className='my-4'>
                  <label className='text-xl mr-4 text-gray-500'>Material ID {index + 1}</label>
                  <input
                    type='text'
                    value={materialID}
                    onChange={(e) => {
                      const newMaterialIDs = [...materialIDs];
                      newMaterialIDs[index] = e.target.value;
                      setMaterialIDs(newMaterialIDs);
                    }}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                  />
                  {errors[`materialID${index + 1}`] && <p className='text-red-500'>{errors[`materialID${index + 1}`]}</p>}
                </div>
                <div className='my-4'>
                  <label className='text-xl mr-4 text-gray-500'>QTY Required {index + 1}</label>
                  <input
                    type='text'
                    value={qtyRequired[index]}
                    onChange={(e) => {
                      const newQtyRequired = [...qtyRequired];
                      newQtyRequired[index] = e.target.value;
                      setQtyRequired(newQtyRequired);
                    }}
                    className='border-2 border-gray-500 px-4 py-2 w-full'
                  />
                  {errors[`qtyRequired${index + 1}`] && <p className='text-red-500'>{errors[`qtyRequired${index + 1}`]}</p>}
                </div>
              </React.Fragment>
            ))}
            <button
              onClick={handleEditSales}
              className='bg-blue-500 text-white px-4 py-2 rounded-xl'
            >
              Update Design Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDesigns;
