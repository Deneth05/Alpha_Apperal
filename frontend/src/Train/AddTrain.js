import { useState, useEffect } from "react";
import axios from "axios";
import './Addtrain.css'; // Ensure you have this CSS for styling
import { useNavigate } from 'react-router-dom';

function AddTrain() {
    const [showdiscounts, setshowdiscounts] = useState([]);
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        usersname: "",
        trainname: "",
        description: "",
        sheduleDate: "",
        sheduleTime: "",
        releventDepartment: "",
        options: "",
    });

    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/item');
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

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        
        // Clear error messages when input changes
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        // Users Name validation
        if (!order.usersname.trim()) {
            newErrors.usersname = "Users Name is required.";
        }

        // Train Name validation
        if (!order.trainname.trim()) {
            newErrors.trainname = "Train Name is required.";
        }

        // Description validation
        if (!order.description.trim()) {
            newErrors.description = "Description is required.";
        }

        // Shedule Date validation
        if (!order.sheduleDate) {
            newErrors.sheduleDate = "Shedule Date is required.";
        }

        // Shedule Time validation
        if (!order.sheduleTime.trim()) {
            newErrors.sheduleTime = "Shedule Time is required.";
        }

        // Relevant Department validation
        if (!order.releventDepartment.trim()) {
            newErrors.releventDepartment = "Relevant Department is required.";
        }

        // Options validation
        if (!order.options.trim()) {
            newErrors.options = "Options are required.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8020/add_trainer", order);
            alert("Details added successfully!");
            navigate("/traindetails");

            // Reset form
            setOrder({
                usersname: "",
                trainname: "",
                description: "",
                sheduleDate: "",
                sheduleTime: "",
                releventDepartment: "",
                options: "",
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the details:", error);
        }
    };

    return (
        <div className="add-user">
            
            <h2>Assign Training Form</h2>
            <form onSubmit={handleSubmit} id="userform">
                <label>Users Name:</label>
                <select
                    id="usersname"
                    name="usersname"
                    value={order.usersname}
                    onChange={handleOnChange}
                >
                    <option value="">Select User</option>
                    {showdiscounts.map((e1) => (
                        <option key={e1._id} value={e1.fname}>
                            {e1.fname}
                        </option>
                    ))}
                </select>
                {errors.usersname && <span className="error">{errors.usersname}</span>}
                <br />

                <label>Train Name:</label>
                <input
                    type="text"
                    id="trainname"
                    name="trainname"
                    value={order.trainname}
                    onChange={handleOnChange}
                />
                {errors.trainname && <span className="error">{errors.trainname}</span>}
                <br />

                <label>Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={order.description}
                    onChange={handleOnChange}
                />
                {errors.description && <span className="error">{errors.description}</span>}
                <br />

                <label>Schedule Date:</label>
                <input
                    type="date"
                    id="sheduleDate"
                    name="sheduleDate"
                    value={order.sheduleDate}
                    onChange={handleOnChange}
                />
                {errors.sheduleDate && <span className="error">{errors.sheduleDate}</span>}
                <br />

                <label>Schedule Time:</label>
                <input
                    type="text"
                    id="sheduleTime"
                    name="sheduleTime"
                    value={order.sheduleTime}
                    onChange={handleOnChange}
                />
                {errors.sheduleTime && <span className="error">{errors.sheduleTime}</span>}
                <br />

                <label>Relevant Department:</label>
                <input
                    type="text"
                    id="releventDepartment"
                    name="releventDepartment"
                    value={order.releventDepartment}
                    onChange={handleOnChange}
                />
                {errors.releventDepartment && <span className="error">{errors.releventDepartment}</span>}
                <br />

                <label>Options:</label>
                <input
                    type="text"
                    id="options"
                    name="options"
                    value={order.options}
                    onChange={handleOnChange}
                />
                {errors.options && <span className="error">{errors.options}</span>}
                <br />

                <button type="submit">Submit</button>
            </form>
            <br/>
            <br/>
            <br/>
            <div className="home"></div>
            <a href={`/itemdetails/`}>Home</a>
            </div>
    
    );
}

export default AddTrain;
