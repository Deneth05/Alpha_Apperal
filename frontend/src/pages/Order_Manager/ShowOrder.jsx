import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/orderBackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ShowOrders = () => {
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/orders/${id}`)
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    const handleGenerateReport = () => {
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', putOnlyUsedFonts: true });
        doc.setFontSize(17);

        // Set position for title
        doc.text('Alpha Apparel (PVT) LTD', 105, 20, { align: 'center' });
        doc.setFontSize(15); // Adjusted font size for subtitle
        doc.text('Order Report', 105, 30, { align: 'center' });
        doc.line(10, 35, 200, 35); // A horizontal line across the page

        // Add order details
        const orderDetails = [
            { label: 'Order ID:', value: orders.OrderID || 'N/A' },
            { label: 'Customer ID:', value: orders.CusID || 'N/A' },
            { label: 'Create Time:', value: new Date(orders.createdAt).toString() || 'N/A' },
            { label: 'Update Time:', value: new Date(orders.updatedAt).toString() || 'N/A' },
        ];

        // Add payment slip image if it exists
        let imageYPos = 30; // Initial vertical position for the image

        // Add item details
        const items = orders.Items || [];
        doc.text('Items:', 10, imageYPos + 20); // Adjust vertical position for items
        items.forEach((item, index) => {
            const itemYPos = imageYPos + 30 + (index * 10); // Adjust position for each item
            doc.text(`Item ${index + 1}:`, 10, itemYPos);
            doc.text(`Item Code: ${item.itemCode || 'N/A'}`, 20, itemYPos + 5);
            doc.text(`Quantity: ${item.qtyRequired || 'N/A'}`, 20, itemYPos + 10);
        });

        // Move the cursor down for order details
        let startY = imageYPos + 30 + (items.length * 10) + 10; // Adjust position after items
        orderDetails.forEach((detail, index) => {
            doc.text(`${detail.label} ${detail.value}`, 10, startY + (index * 10));
        });

        // Adjust for image if it exists
        if (orders.image) {
            const img = new Image();
            img.src = orders.image;
            img.onload = () => {
                const imgWidth = 80; // Set image width
                const imgHeight = (imgWidth / img.width) * img.height; // Maintain aspect ratio
                doc.addImage(img, 'PNG', 10, startY + orderDetails.length * 10 + 10, imgWidth, imgHeight);
                doc.save(`Order_${orders.OrderID}_Report.pdf`);
            };
        } else {
            // Save the PDF if there's no image
            doc.save(`Order_${orders.OrderID}_Report.pdf`);
        }
    };


    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="brand">
                    <img src="/company-logo.png" className='company-logo' alt='company-logo' />
                </div>
                <nav>
                    <div className='nav-dept'><Link to="/"><img src='/public/home.png' className='icon' alt='Home' /> Home</Link></div>
                    <div className='nav-dept'><Link to=""><img src='/public/inventory.png' className='icon' alt='Inventory' /> Inventory</Link></div>
                    <div className='nav-dept'><Link to="/design/home"><img src='/public/tshirt.png' className='icon' alt='Design' /> Design</Link></div>
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
                    <div className='nav-dept'><Link to=""><img src='/public/transport.png' className='icon' alt='Transport' /> Transport</Link></div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header>
                    <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
                </header>
                <div className="main-content flex-1 p-6">
                    <div className='button-container'></div>

                    <BackButton />


                    <h1 className='text-3xl my-4'>Show Order</h1>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className='border border-sky-400 rounded-xl p-6 bg-white shadow-lg'>
                            <div className='my-4'>
                                <h2 className='text-2xl font-bold text-gray-700'>Order Details</h2>
                            </div>
                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>ID: </span>
                                <span>{orders._id}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>Order ID: </span>
                                <span>{orders.OrderID}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>Customer ID: </span>
                                <span>{orders.CusID}</span>
                            </div>

                            {/* Display items in the order */}
                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>Items: </span>
                                {orders.Items && orders.Items.length > 0 ? (
                                    <div className="my-4">
                                        {orders.Items.map((item, index) => (
                                            <div key={index} className='border border-gray-300 rounded-lg p-2 mb-2'>
                                                <p className='text-md font-semibold'>Item {index + 1}</p>
                                                <p>Item Code: {item.itemCode}</p>
                                                <p>Quantity: {item.qtyRequired}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span>No items in this order.</span>
                                )}
                            </div>

                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>Create Time: </span>
                                <span>{new Date(orders.createdAt).toString()}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>Update Time: </span>
                                <span>{new Date(orders.updatedAt).toString()}</span>
                            </div>

                            <div className='my-4'>
                                <span className='text-lg text-gray-500'>Payment Slip: </span>
                                {orders.image ? (
                                    <center>
                                        <img
                                            src={orders.image}
                                            alt={orders.DesignName || 'Design Image'}
                                            className="w-full h-auto border border-gray-500 rounded"
                                        />
                                    </center>
                                ) : (
                                    <span>No Image</span>
                                )}
                            </div>


                            {/* Generate Report Button */}
                            <button onClick={handleGenerateReport} className='button generate-report'
                            style={{
                                backgroundColor: '#BDE8CA', 
                                color: '#000000', 
                                borderRadius: '5px', 
                                padding: '10px 20px', 
                                fontSize: '16px', 
                                justifyContent: 'center', 
                                
                            }} >
                                Report (PDF)
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowOrders;
