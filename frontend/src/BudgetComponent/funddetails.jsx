import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './funddetails.css';
import { useReactToPrint } from 'react-to-print';

function RefundDetails() {
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
            customer && customer.department && customer.department.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    }
    
    return (
        <div className="showitems">
           <div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='Department' className='in'/> <t></t> 

        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
            <div ref={componentPDF} style={{ width: '100%' }}>
                <h2>Total funds</h2> 
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Project </th>
                            <th>Allocated Amount</th>
                            <th>Spent Amount</th>
                            {!isGeneratingPDF && <th>Action</th>}
                        </tr>
                    </thead>
            
                    <tbody>
                        {showdiscounts.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.department}</td>
                                <td>{e1.project}</td>
                                <td>{e1.Allocated_Amount}</td>
                                <td>{e1.spent_amount}</td>
                               
                                {!isGeneratingPDF && (
                                    <td>
                                        <a href={`/Updatefund/${e1._id}`}>Edit </a>
                                        <button onClick={() => handledelete(e1._id)}>Delete </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF}>Refund Report</button>
        </div>
    );
}

export default RefundDetails;
