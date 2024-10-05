import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './traindetails.css';
import { useReactToPrint } from 'react-to-print';

function TrainDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [searchkey,setsearchkey]=useState('');

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/traines');
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
        const data = await axios.delete('http://localhost:8020/trainer_delete/' + id);
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
            customer && customer.rouly_garbage && customer.rouly_garbage.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    }
    
    return (
        <div id="train-showuserdetails">
             <h2>Training Details</h2>
            <div ref={componentPDF} style={{ width: '100%' }}>
              
                <table>
                    <thead>
                        <tr>
                            <th>Users Name</th>
                            <th> Train Name</th>
                            <th> Description</th>
                            <th>Schedule Date</th>
                            <th>Schedule Time</th>
                            <th>Relevant Department</th>
                            <th>Options</th>
                          
                          
                           
                            {!isGeneratingPDF && <th>Action</th>}
                        </tr>
                    </thead>
      
                    <tbody id='train-body'>
                        {showdiscounts.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.usersname}</td>
                                <td>{e1.trainname}</td>
                                <td>{e1.description}</td>
                                <td>{e1.sheduleDate}</td>
                                <td>{e1.sheduleTime}</td>
                                <td>{e1.releventDepartment}</td>
                                <td>{e1.options}</td>
                               
                               
                                {!isGeneratingPDF && (
                                    <td>
                                        <a href={`/trainerupdate/${e1._id}`}>Edit </a>
                                        <button onClick={() => handledelete(e1._id)}>Delete </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <a href={`/itemdetails/`}>Home</a>
            </div>
          
        </div>
    );
}

export default TrainDetails;
