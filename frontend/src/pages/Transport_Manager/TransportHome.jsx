import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { generatePath, Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FaCar } from 'react-icons/fa';

import { useReactToPrint } from "react-to-print";

const Home = () => {
    const componentPDF = useRef();
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [jobFilter, setJobFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [filteredTransports, setFilteredTransports] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/transport')
            .then((response) => {
                const transportsWithDates = response.data.data.map(transport => {
                    const date = new Date(transport.date);
                    return {
                        ...transport,
                        date: isNaN(date.getTime()) ? null : date
                    };
                });
                setTransports(transportsWithDates);
                setFilteredTransports(transportsWithDates);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const formatDate = (date) => {
        if (!date || isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0];
    };

    const handleSearch = () => {
        const filtered = transports.filter((transport) =>
            transport.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTransports(filtered);
    };

    const handleFilter = () => {
        let filtered = transports;

        if (jobFilter) {
            filtered = filtered.filter((transport) =>
                transport.job.toLowerCase() === jobFilter.toLowerCase()
            );
        }

        if (dateFilter) {
            filtered = filtered.filter((transport) =>
                formatDate(transport.date) === dateFilter
            );
        }

        setFilteredTransports(filtered);
    };

    const handleResetSearch = () => {
        setSearchQuery('');
        setFilteredTransports(transports);
    };

    const handleResetFilters = () => {
        setJobFilter('');
        setDateFilter('');
        setFilteredTransports(transports);
    };

    useEffect(() => {
        handleFilter();
    }, [jobFilter, dateFilter, transports]);

    // Report generation
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Userdata",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="sidebar w-1/5 p-4 bg-gray-100">
                <div className="brand mb-6">
                    <img src='../public/company-logo.png' className='company-logo' alt='company-logo' />
                </div>
                <nav>
                <div className='nav-dept'><Link to="/"><img src='/public/home.png' className='icon' alt='Home' /> Home</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/inventory.png' className='icon' alt='Inventory' /> Inventory</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/tshirt.png' className='icon' alt='Design' /> Design</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/orders.png' className='icon' alt='Orders' /> Orders</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/supplier.png' className='icon' alt='Supplier' /> Supplier</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/marketing.png' className='icon' alt='Marketing' /> Marketing</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/human-resource.png' className='icon' alt='Human Resource' /> Human Resource</Link></div>
                    <div className='nav-dept financial'>
                        <Link to="">
                            <img src='/public/financial.png' className='icon' alt='Financial' /> Financial
                        </Link>
                        <div className='dropdown'>
                            <Link to="/fundRequests/create">Request Fund</Link>
                            <Link to="">Finance Dashboard</Link>
                        </div>
                    </div>
                    <div className='nav-dept'><Link to="/transport/home"><img src='/public/transport.png' className='icon' alt='Transport' /> Transport</Link></div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content w-4/5 p-6">
                <header className="mb-6">
                    <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
                </header>

                <div className='button-container'>
                </div>


                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-3xl my-6 text-center font-bold text-dark-blue'>
                            Manage All The Transportation Here
                        </h1>
                        <div className='flex items-center gap-x-2'>
                            <Link to='/transport/create'>
                                <MdOutlineAddBox className='text-sky-800 text-4xl' />
                            </Link>
                            <Link to='/vehicle'>
                                <FaCar className='text-sky-800 text-4xl' />
                            </Link>
                        </div>
                    </div>

                    {/* Report Generation Button */}
                    <div className='flex justify-end mb-3'>
                        <button
                            className='px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-red-500'
                            onClick={generatePDF}
                            style={{ width: "200px" }} // Adjust the width as needed
                        >
                            Report Generation
                        </button>

                    </div>

                    {/* Search input */}
                    <div className='my-4 flex items-center'>
                        <input
                            type='text'
                            placeholder='Search by vehicle name...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='p-2 border border-gray-300'
                        />
                        <button
                            onClick={handleSearch}
                            className='px-4 py-2 bg-blue-800 text-white ml-2 hover:bg-blue-400'
                            style={{ width: "150px" }}
                        >
                            Search
                        </button>
                        <button
                            onClick={handleResetSearch}
                            className='px-4 py-2 bg-gray-500 text-white ml-2'
                            style={{ width: "150px" }}
                        >
                            Reset
                        </button>
                    </div>

                    {/* Filter inputs and buttons */}
                    <div className='my-4 flex justify-end items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <select
                                value={jobFilter}
                                onChange={(e) => setJobFilter(e.target.value)}
                                className='p-2 border border-gray-300'
                            >
                                <option value=''>Filter by job</option>
                                <option value='staff'>Staff</option>
                                <option value='production'>Production</option>
                            </select>

                            <input
                                type='date'
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className='p-2 border border-gray-300'
                            />

                            <button
                                onClick={handleFilter}
                                className='px-4 py-2 bg-green-500 text-white hover:bg-green-700'
                                style={{ width: "150px" }}
                            >
                                Filter
                            </button>
                            <button
                                onClick={handleResetFilters}
                                className='px-4 py-2 bg-gray-500 text-white'
                                style={{ width: "150px" }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : (
                        <div ref={componentPDF} style={{ width: '100%' }}>
                            <table className='w-full border-collapse'>
                                <thead>
                                    <tr>
                                        <th className='border border-slate-600 bg-blue-500 text-white py-2'>No</th>
                                        <th className='border border-slate-600 bg-blue-500 text-white py-2'>Job</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>Vehicle</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>VehicleNo</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>DriverNIC</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>Date</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>Time</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>Cost</th>
                                        <th className='border border-slate-600 max-md:hidden bg-blue-500 text-white py-2'>Destination</th>
                                        <th className='border border-slate-600 bg-blue-500 text-white py-2'>Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransports.map((transport, index) => (
                                        <tr key={transport._id} className='h-8'>
                                            <td className='border border-slate-600 text-center'>
                                                {index + 1}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.job}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.vehicle}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.vehicleNo}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.driver}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {formatDate(transport.date)}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.time}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.cost}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                {transport.destination}
                                            </td>
                                            <td className='border border-slate-600 text-center'>
                                                <div className='flex justify-center gap-x-4'>
                                                    <Link to={`/transport/details/${transport._id}`}>
                                                        <BsInfoCircle className='text-2xl text-green-800' />
                                                    </Link>
                                                    <Link to={`/transport/edit/${transport._id}`}>
                                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                    </Link>
                                                    <Link to={`/transport/delete/${transport._id}`}>
                                                        <MdOutlineDelete className='text-2xl text-red-800' />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Home;
