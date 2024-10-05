import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './fundreport.css';
import { useReactToPrint } from 'react-to-print';

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Fundreport() {
    const componentPDF = useRef();
    const [countlist, setcountlist] = useState([]);
    const [customerlist, setcustomerlist] = useState([]);

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Total Refund Report',
        onBeforeGetContent: () => {
            return Promise.resolve();
        },
        onAfterPrint: () => {
            alert('Data saved in PDF');
        }
    });

    // Fetch data
    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/item_count');
            const { count } = data.data;
            setcountlist(count);
            setcustomerlist(data.data.data);
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Sort data by age
    const sortedCustomerList = [...customerlist].sort((a, b) => a.Allocated_Amount - b.Allocated_Amount);

    // Prepare data for the bar chart
    const chartData = {
        labels: sortedCustomerList.map(order => order.Allocated_Amount),
        datasets: [
            {
                label: 'Amount ',
                data: sortedCustomerList.map(order => order.Allocated_Amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className='report'>
            
            {countlist !== null ? (
               <h3><p>Total : {countlist}</p></h3>
            ) : (
                <p>Loading...</p>
            )}

            <h3>Fund Details :</h3>

            {/* Content to be printed */}
            <div ref={componentPDF} className='pdf-content'>
                <h2 className='pdf-title'>Budget Management</h2>

                {/* Bar chart */}
                <div className='chart-container'>
                    <Bar data={chartData} />
                </div>

                {/* Table */}
                <table>
                    <thead>
                        <tr>
                        <th>Department</th>
                            <th>Project </th>
                            <th>Allocated Amount</th>
                            <th>Spent Amount</th>
                        </tr>
                    </thead>
  
                    <tbody>
                        {sortedCustomerList.map((e) => (
                            <tr key={e.order_id}>
                                <td>{e.department}</td>
                                <td>{e.project}</td>
                                <td>{e.Allocated_Amount}</td>
                                <td>{e.spent_amount}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={generatePDF}>Download Report</button>
        </div>
    );
}

export default Fundreport;
