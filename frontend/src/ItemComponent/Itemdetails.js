import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './itemdetails.css';
import { useReactToPrint } from 'react-to-print';

function ItemDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey,setsearchkey]=useState('');

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/item');
            console.log(data.data.success);
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

 
    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:8020/item_delete/' + id);
        if (data.data.success) {
            getfetchdata();
            console.log(data.data.message);
            alert('Item  deleted Successfully!');
        }
    };

    
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Item Report',
        onBeforeGetContent: () => {
            setIsGeneratingPDF(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsGeneratingPDF(false);
            alert('Data saved in PDF');
        }
    });
    const handlesearch = (e) => {

        filterdata(searchkey);
    }
    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer && customer.fname && customer.fname.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    }
    
    
    return (
        <div className="admin-showitems">
            <a href='/add-train'>Add Training</a>
            <a href='/traindetails'>Training Details</a>
            <a href='/add-user'>Add User</a>
            <a href='/userdetails'>Users details</a>
           
           <br/>
           <br/>
           <br/>
           <br/>


           <div className='employee-searchbtn'>
          
        <br/>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='Name' className='in'/> <t></t> 

        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
            <div ref={componentPDF} style={{ width: '50%' }}>
            <h2>HR Management</h2> 
                
               <h2>Total Employees</h2> 
                <table id='employee-table'>
                    <thead id='employee-table-header'>
                        <tr>
                            <th>Full Name</th>
                            <th> Email</th>
                            <th> ID Number</th>
                            <th>Birth Certificate</th>
                            <th>Educational Qualifiactions</th>
                            <th>Medical Report</th>
                            <th>Joined Date</th>
                            <th>Designation</th>
                            <th> Department</th>
                            <th>Basic Salary</th>
                            <th>Allowance </th>
                            <th>Skill Level </th>
                           
                            {!isGeneratingPDF && <th>Action</th>}
                        </tr>
                    </thead>
          
                    <tbody id='employee-table-body'>
    {showdiscounts.map((e1) => (
        <tr key={e1._id}>
            <td>{e1.fname}</td>
            <td>{e1.emaill}</td>
            <td>{e1.idnumber}</td>
            <td>{e1.doc1}</td>
            <td>{e1.doc2}</td>
            <td>{e1.doc3}</td>
            <td>{e1.join_date}</td>
            <td>{e1.designation}</td>
            <td>{e1.department}</td>
            <td>{e1.basic_salary}</td>
            <td>{e1.allownance}</td>
            <td>{e1.skill_level}</td>

            {!isGeneratingPDF && (
                <td>
                    <a href={`/itemview/${e1._id}`}>View</a> {/* New View option */}
                    <br />
                    <br />
                    <br />

                    <a href={`/itemupdate/${e1._id}`}>Edit</a>
                    <br />
                    <br />
                    <br />
                    <button onClick={() => handledelete(e1._id)}>Delete</button>
                </td>
            )}
        </tr>
    ))}
</tbody>
                </table>
            </div>
            <button onClick={generatePDF}> Download Report</button>
            <a href={`/add-item/`}>Add employee </a>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <a href={`/`}>Sign Out </a>
        </div>
        
    );
}

export default ItemDetails;
