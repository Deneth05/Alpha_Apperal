import React, { useState } from 'react';
import BackButton from '../components/customerBackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateCustomer = () => {
  const [CustomerID, setCustomerID] = useState('');
  const [CustomerName, setCustomerName] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Country, setCountry] = useState('');
  const [CountryCode, setCountryCode] = useState('');
  const [ContactNo1, setContactNo1] = useState('');
  const [ContactNo2, setContactNo2] = useState('');
  const [Email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!CustomerID.trim()) newErrors.CustomerID = 'Customer ID is required';
    if (!CustomerName.trim()) newErrors.CustomerName = 'Customer Name is required';
    if (!Address.trim()) newErrors.Address = 'Address is required';
    if (!City.trim()) newErrors.City = 'City is required';
    if (!Country.trim()) newErrors.Country = 'Country is required';
    
    // Country Code validation
    if (!CountryCode.trim()) {
      newErrors.CountryCode = 'Country Code is required';
    } else if (!/^\+\d{1,3}$/.test(CountryCode)) {
      newErrors.CountryCode = 'Country Code must be in the format +XX or +XXX';
    }

    // Contact Number validation
    if (!ContactNo1.trim()) {
      newErrors.ContactNo1 = 'Primary Contact No is required';
    } else if (!/^\d{7,12}$/.test(ContactNo1)) {
      newErrors.ContactNo1 = 'Primary Contact No must be between 7 to 12 digits';
    }

    if (ContactNo2 && !/^\d{7,12}$/.test(ContactNo2)) {
      newErrors.ContactNo2 = 'Secondary Contact No must be between 7 to 12 digits';
    }

    // Email validation
    if (!Email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
      newErrors.Email = 'A valid email is required';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCustomer = () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Create a JSON object
    const data = {
      CustomerID,
      CustomerName,
      Address,
      City,
      Country,
      CountryCode,
      ContactNo1,
      ContactNo2,
      Email,
    };

    setLoading(true);

    // Send the JSON data with axios
    axios.post('http://localhost:5555/customers', data, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        setLoading(false);
        navigate('/customers/home');
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error:', error);
        alert('CustomerID has already been taken. Please choose a different one.');
      });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src='../public/company-logo.png' className='logo' alt='company-logo' />
        </div>
        <nav>
          <div className='nav-dept'><Link to="/home"><img src='/public/home.png' className='icon' alt='Home' />Home</Link></div>
          <div className='nav-dept'><Link to="/inventory/home"><img src='/public/inventory.png' className='icon' alt='Inventory' />Inventory</Link></div>
          <div className='nav-dept'><Link to="/"><img src='/public/tshirt.png' className='icon' alt='Design' />Design</Link></div>
          <div className='nav-dept'><Link to="/customers/home"><img src='/public/orders.png' className='icon' alt='Orders' />Orders</Link></div>
          <div className='nav-dept'><Link to="/supplier"><img src='/public/supplier.png' className='icon' alt='Supplier' />Supplier</Link></div>
          <div className='nav-dept'><Link to="/discounts/home"><img src='/public/marketing.png' className='icon' alt='Marketing' />Marketing</Link></div>
          <div className='nav-dept'><Link to="/hr"><img src='/public/human-resource.png' className='icon' alt='Human Resource' />Human Resource</Link></div>
          <div className='nav-dept'><Link to="/financial"><img src='/public/financial.png' className='icon' alt='Financial' />Financial</Link></div>
          <div className='nav-dept'><Link to="/transport"><img src='/public/transport.png' className='icon' alt='Transport' />Transport</Link></div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1 className='text-3xl font-bold company-name'>Alpha Apparels PVT LTD</h1>
        </header>
        <div className='button-container'>
        </div>

        <div className='main-content p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Create Customer Record</h1>
          {loading && <Spinner />}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            {/* Input fields */}
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Customer ID</label>
              <input
                type='text'
                value={CustomerID}
                onChange={(e) => setCustomerID(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.CustomerID && <p className='text-red-500'>{errors.CustomerID}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Customer Name</label>
              <input
                type='text'
                value={CustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.CustomerName && <p className='text-red-500'>{errors.CustomerName}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Address</label>
              <input
                type='text'
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.Address && <p className='text-red-500'>{errors.Address}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>City</label>
              <input
                type='text'
                value={City}
                onChange={(e) => setCity(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.City && <p className='text-red-500'>{errors.City}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Country</label>
              <input
                type='text'
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.Country && <p className='text-red-500'>{errors.Country}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Country Code</label>
              <input
                type='text'
                value={CountryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.CountryCode && <p className='text-red-500'>{errors.CountryCode}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Primary Contact No</label>
              <input
                type='text'
                value={ContactNo1}
                onChange={(e) => setContactNo1(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.ContactNo1 && <p className='text-red-500'>{errors.ContactNo1}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Secondary Contact No (optional)</label>
              <input
                type='text'
                value={ContactNo2}
                onChange={(e) => setContactNo2(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.ContactNo2 && <p className='text-red-500'>{errors.ContactNo2}</p>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Email</label>
              <input
                type='email'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
              {errors.Email && <p className='text-red-500'>{errors.Email}</p>}
            </div>
            <div className='my-4'>
              <button
                onClick={handleSaveCustomer}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
