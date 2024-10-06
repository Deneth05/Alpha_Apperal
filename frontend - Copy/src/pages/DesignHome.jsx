import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdSearch } from 'react-icons/md';
import Spinner from '../components/Spinner';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Buffer } from 'buffer';

const generateDesignReport = (sizesData) => {
  const doc = new jsPDF({ orientation: 'portrait' });
  doc.setFontSize(17);
  doc.text('Alpha Apparel (PVT) LTD', 75, 20);
  doc.text('Design Report', 90, 35);
  doc.text('---------------------------------------------------------------------------', 30, 45);

  const columns = [
    { title: 'Design ID', dataKey: 'designID' },
    { title: 'Design Name', dataKey: 'DesignName' },
    { title: 'Description', dataKey: 'description' },
  ];

  const data = sizesData.map((design) => ({
    designID: design.designID,
    DesignName: design.DesignName,
    description: design.description || 'N/A',
  }));

  // Add image cells with proper formatting
  doc.autoTable({
    head: [columns.map((col) => col.title)],
    body: data.map((row) => {
      const imageData = row.image ? { image: row.image, fit: [100, 50], valign: 'middle' } : '';
      return [row.designID, row.DesignName, row.description];
    }),
    startY: 50,
  });

  // Save the PDF
  doc.save('design_report.pdf');
};

const generateMaterialRequirementReport = (materialRequirementsData) => {
  const doc = new jsPDF({ orientation: 'landscape' });
  doc.setFontSize(17);
  doc.text('Alpha Apparel (PVT) LTD', 120, 20);
  doc.text('Material Requirement Report', 110, 35);
  doc.text('---------------------------------------------------------------------------', 80, 45);

  const columns = [
    { title: 'Design ID', dataKey: 'designID' },
    { title: 'Size ID', dataKey: 'sizeID' },
    { title: 'Material ID 1', dataKey: 'materialID1' },
    { title: 'QTY Required 1', dataKey: 'qtyRequired1' },
    { title: 'Material ID 2', dataKey: 'materialID2' },
    { title: 'QTY Required 2', dataKey: 'qtyRequired2' },
    { title: 'Material ID 3', dataKey: 'materialID3' },
    { title: 'QTY Required 3', dataKey: 'qtyRequired3' },
    { title: 'Material ID 4', dataKey: 'materialID4' },
    { title: 'QTY Required 4', dataKey: 'qtyRequired4' },
    { title: 'Material ID 5', dataKey: 'materialID5' },
    { title: 'QTY Required 5', dataKey: 'qtyRequired5' },
    { title: 'Material ID 6', dataKey: 'materialID6' },
    { title: 'QTY Required 6', dataKey: 'qtyRequired6' },
    { title: 'Material ID 7', dataKey: 'materialID7' },
    { title: 'QTY Required 7', dataKey: 'qtyRequired7' },
    { title: 'Material ID 8', dataKey: 'materialID8' },
    { title: 'QTY Required 8', dataKey: 'qtyRequired8' },
    { title: 'Material ID 9', dataKey: 'materialID9' },
    { title: 'QTY Required 9', dataKey: 'qtyRequired9' },
    { title: 'Material ID 10', dataKey: 'materialID10' },
    { title: 'QTY Required 10', dataKey: 'qtyRequired10' },
  ];

  const data = materialRequirementsData.map((materialRequirement) => ({
    designID: materialRequirement.designID,
    sizeID: materialRequirement.sizeID,
    materialID1: materialRequirement.materialID1 || 'N/A',
    qtyRequired1: materialRequirement.qtyRequired1 || 0,
    materialID2: materialRequirement.materialID2 || 'N/A',
    qtyRequired2: materialRequirement.qtyRequired2 || 0,
    materialID3: materialRequirement.materialID3 || 'N/A',
    qtyRequired3: materialRequirement.qtyRequired3 || 0,
    materialID4: materialRequirement.materialID4 || 'N/A',
    qtyRequired4: materialRequirement.qtyRequired4 || 0,
    materialID5: materialRequirement.materialID5 || 'N/A',
    qtyRequired5: materialRequirement.qtyRequired5 || 0,
    materialID6: materialRequirement.materialID6 || 'N/A',
    qtyRequired6: materialRequirement.qtyRequired6 || 0,
    materialID7: materialRequirement.materialID7 || 'N/A',
    qtyRequired7: materialRequirement.qtyRequired7 || 0,
    materialID8: materialRequirement.materialID8 || 'N/A',
    qtyRequired8: materialRequirement.qtyRequired8 || 0,
    materialID9: materialRequirement.materialID9 || 'N/A',
    qtyRequired9: materialRequirement.qtyRequired9 || 0,
    materialID10: materialRequirement.materialID10 || 'N/A',
    qtyRequired10: materialRequirement.qtyRequired10 || 0,
  }));

  // Generate the table
  doc.autoTable({
    head: [columns.map((col) => col.title)],
    body: data,
    startY: 50,
  });

  // Save the PDF
  doc.save('material_requirement_report.pdf');
};

const DesignHome = () => {
  const [designs, setDesigns] = useState([]);
  const [MaterialRequirement, setMaterialRequirement] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/designs')
      .then((response) => {
        setDesigns(response.data);
        setFilteredSizes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching design data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/materialRequirements')
      .then((response) => {
        setMaterialRequirement(response.data);
        setFilteredSizes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching material requirement data:', error);
        setLoading(false);
      });
  }, []);

  // Filter function
  useEffect(() => {
    let filtered = designs;

    // Filter based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (design) =>
          design.designID.toLowerCase().includes(query) ||
          design.DesignName.toLowerCase().includes(query) ||
          design.sizeID.toLowerCase().includes(query)
      );
    }

    // Filter based on selected size
    if (selectedSize) {
      filtered = filtered.filter((design) => design.sizeID === selectedSize);
    }

    setFilteredSizes(filtered);
  }, [searchQuery, selectedSize, designs]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredSizes(designs, MaterialRequirement);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = designs.filter((design) =>
        design.designID.toLowerCase().includes(query) ||
        design.DesignName.toLowerCase().includes(query) ||
        design.sizeID.toLowerCase().includes(query)
      );
      setFilteredSizes(filtered);
    }
  }, [searchQuery, designs]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src='../public/company-logo.png' className='logo' alt='company-logo' />
        </div>
        <nav>
          <div className='nav-dept'><Link to="/home"><img src='/public/home.png' className='icon' alt="Home" />Home</Link></div>
          <div className='nav-dept'><Link to="/inventory/home"><img src='/public/inventory.png' className='icon' alt="Inventory" />Inventory</Link></div>
          <div className='nav-dept'><Link to="/"><img src='/public/tshirt.png' className='icon' alt="Design" />Design</Link></div>
          <div className='nav-dept'><Link to="/orders"><img src='/public/orders.png' className='icon' alt="Orders" />Orders</Link></div>
          <div className='nav-dept'><Link to="/supplier"><img src='/public/supplier.png' className='icon' alt="Supplier" />Supplier</Link></div>
          <div className='nav-dept'><Link to="/marketing"><img src='/public/marketing.png' className='icon' alt="Marketing" />Marketing</Link></div>
          <div className='nav-dept'><Link to="/hr"><img src='/public/human-resource.png' className='icon' alt="Human Resource" />Human Resource</Link></div>
          <div className='nav-dept'><Link to="/financial"><img src='/public/financial.png' className='icon' alt="Financial" />Financial</Link></div>
          <div className='nav-dept'><Link to="/transport"><img src='/public/transport.png' className='icon' alt="Transport" />Transport</Link></div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
        </header>
        <div className='button-container'>
          <div className='search-container'>
            <div className='search-bar-container'>
              <MdSearch className='search-icon' />
              <input
                type='text'
                placeholder='Search by Design ID or Design Name'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='search-bar'
              />
            </div>
          
          </div>
          <Link to='/designs/create'>
            <button className='button buttonAddNew'>
              <img src='../public/add.png' className='icon' alt='Add' /> Add New Pattern
            </button>
          </Link>
          <Link to='/sizes/home'>
            <button className='button buttonSizes'>
              <img src='../public/tape-measure.png' className='icon' alt='Add' /> Sizes Available
            </button>
          </Link>
          <button onClick={() => generateDesignReport(filteredSizes)} className='button generate-report'>
            <span className='icon'><img src='../public/pdf.png' alt='PDF' /></span> Generate Report (PDF)
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className='text-3xl '>Manage Designs</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className='table-heading'>Design ID</th>
                    <th className='table-heading max-md:hidden'>Design Name</th>
                    <th className='table-heading'>Design Sketch</th>
                    <th className='table-heading'>Description</th>
                    <th className='table-heading'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSizes.length > 0 ? (
                    filteredSizes.map((design) => (
                      <tr key={design._id} className="h-8">
                        <td className="border border-slate-700 rounded-md text-center">
                          {design.designID}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {design.DesignName}
                        </td>
                        <td className="border border-slate-700 rounded-md">
                          <center>
                            {design.image ? (
                              <img
                                src={design.image}
                                alt={design.DesignName || 'Design Image'}
                                className="design-image"
                              />
                            ) : (
                              <span>No Image</span>
                            )}
                          </center>

                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {design.description || 'N/A'}

                        </td>


                        <td className="border border-slate-700 rounded-md text-center">
                          <div className="flex justify-center gap-x-4">
                            <Link to={`/designs/details/${design._id}`}>
                              <BsInfoCircle className="text-2xl text-green-800" />
                            </Link>
                            <Link to={`/designs/edit/${design._id}`}>
                              <AiOutlineEdit className="text-2xl text-yellow-600" />
                            </Link>
                            <Link to={`/designs/delete/${design._id}`}>
                              <MdOutlineDelete className="text-2xl text-red-600" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        No design records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Second Table */}
            <div className='button-container'>
              <div className='search-container'>
                <div className='search-bar-container'>
                  <MdSearch className='search-icon' />
                  <input
                    type='text'
                    placeholder='Search by Design ID, Size ID or Material ID'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-bar'
                  />
                </div>

                {/* Dropdown for Size Filter */}
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value=""> Filter By All Sizes</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                  <option value="3xl">3XL</option>

                </select>
              </div>
              <Link to='/materialReq/create'>
                <button className='button buttonAddNew'>
                  <img src='../public/add.png' className='icon' alt='Add' /> Add Material Requirement
                </button>
              </Link>
              <button onClick={() => generateMaterialRequirementReport(filteredSizes)} className='button generate-report'>
                <span className='icon'><img src='../public/pdf.png' alt='PDF' /></span> Generate Report (PDF)
              </button>

            </div>

            <h1 className='text-3xl '>Manage Material Requirement</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className='table-heading'>Design ID</th>
                    <th className='table-heading max-md:hidden'>Size ID</th>
                    <th className='table-heading max-md:hidden'>Material ID 1</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 2</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 3</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 4</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 5</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 6</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 7</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 8</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 9</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'>Material ID 10</th>
                    <th className='table-heading max-md:hidden'>QTY Required</th>
                    <th className='table-heading max-md:hidden'></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSizes.length > 0 ? (
                    filteredSizes.map((materialRequirements) => (
                      <tr key={materialRequirements._id} className="h-8">
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.designID}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.sizeID || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID1 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired1 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID2 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired2 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID3 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired3 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID4 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired4 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID5 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired5 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID6 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired6 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID7 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired7 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID8 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired8 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID9 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired9 || 0}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                          {materialRequirements.materialID10 || 'N/A'}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                          {materialRequirements.qtyRequired10 || 0}
                        </td>

                        <td className="border border-slate-700 rounded-md text-center">
                          <div className="flex justify-center gap-x-4">
                            <Link to={`/materialReq/edit/${materialRequirements._id}`}>
                              <AiOutlineEdit className="text-2xl text-yellow-600" />
                            </Link>
                            <Link to={`/materialReq/delete/${materialRequirements._id}`}>
                              <MdOutlineDelete className="text-2xl text-red-600" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="20" className="text-center p-4">
                        No design records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default DesignHome;