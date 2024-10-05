import { useState } from "react";
import axios from "axios";
import './additem.css';
import { useNavigate } from 'react-router-dom';

function Product() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        fname:"",
        emaill:"",
        idnumber:"",
        doc1:"",
        doc2:"",
        doc3:"",
        join_date:"",
        designation:"",
        department:"",
        basic_salary:"",
        allownance:"",
        skill_level:"",
       
    });

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

        // Full Name validation
        if (!order.fname.trim()) {
            newErrors.fname = "Full Name is required.";
        }

        // Email validation
        if (!order.emaill.trim()) {
            newErrors.emaill = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(order.emaill)) {
            newErrors.emaill = "Email address is invalid.";
        }

        // ID Number validation
        if (!order.idnumber.trim()) {
            newErrors.idnumber = "ID Number is required.";
        }

        // Document 1 validation
        if (!order.doc1.trim()) {
            newErrors.doc1 = "Document 1 is required.";
        }

        // Document 2 validation
        if (!order.doc2.trim()) {
            newErrors.doc2 = "Document 2 is required.";
        }

        // Document 3 validation
        if (!order.doc3.trim()) {
            newErrors.doc3 = "Document 3 is required.";
        }

        // Join Date validation
        if (!order.join_date.trim()) {
            newErrors.join_date = "Join Date is required.";
        }

        // Designation validation
        if (!order.designation.trim()) {
            newErrors.designation = "Designation is required.";
        }

        // Department validation
        if (!order.department.trim()) {
            newErrors.department = "Department is required.";
        }

        // Basic Salary validation
        if (!order.basic_salary.trim()) {
            newErrors.basic_salary = "Basic Salary is required.";
        } else if (isNaN(order.basic_salary)) {
            newErrors.basic_salary = "Basic Salary must be a number.";
        }

        // Allowance validation
        if (!order.allownance.trim()) {
            newErrors.allownance = "Allowance is required.";
        } else if (isNaN(order.allownance)) {
            newErrors.allownance = "Allowance must be a number.";
        }

        // Skill Level validation
        if (!order.skill_level.trim()) {
            newErrors.skill_level = "Skill Level is required.";
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
            const response = await axios.post("http://localhost:8020/item_create", order);
            console.log(response.data);
            alert("Details added successfully!");
            navigate("/itemdetails");

            // Reset form
            setOrder({
                fname: "",
                emaill: "",
                idnumber: "",
                doc1: "",
                doc2: "",
                doc3: "",
                join_date: "",
                designation: "",
                department: "",
                basic_salary: "",
                allownance: "",
                skill_level: ""
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the details:", error);
        }
    };

    return (
        <div id="add-employee-form">
            <h1>Add new employee</h1>
           
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={order.fname}
                    onChange={handleOnChange}
                />
                {errors.fname && <span className="error">{errors.fname}</span>}
                <br />

                <label>Email:</label>
                <input
                    type="text"
                    id="emaill"
                    name="emaill"
                    value={order.emaill}
                    onChange={handleOnChange}
                />
                {errors.emaill && <span className="error">{errors.emaill}</span>}
                <br />

                <label>ID Number:</label>
                <input
                    type="text"
                    id="idnumber"
                    name="idnumber"
                    value={order.idnumber}
                    onChange={handleOnChange}
                />
                {errors.idnumber && <span className="error">{errors.idnumber}</span>}
                <br />

                <label>Birh Certificate:</label>
                <input
                    type="file"
                    id="doc1"
                    name="doc1"
                    value={order.doc1}
                    onChange={handleOnChange}
                />
                {errors.doc1 && <span className="error">{errors.doc1}</span>}
                <br />

                <label>Educational Qualifications:</label>
                <input
                    type="file"
                    id="doc2"
                    name="doc2"
                    value={order.doc2}
                    onChange={handleOnChange}
                />
                {errors.doc2 && <span className="error">{errors.doc2}</span>}
                <br />

                <label>Medical Report:</label>
                <input
                    type="file"
                    id="doc3"
                    name="doc3"
                    value={order.doc3}
                    onChange={handleOnChange}
                />
                {errors.doc3 && <span className="error">{errors.doc3}</span>}
                <br />

                <label>Joined Date:</label>
                <input
                    type="date"
                    id="join_date"
                    name="join_date"
                    value={order.join_date}
                    onChange={handleOnChange}
                />
                {errors.join_date && <span className="error">{errors.join_date}</span>}
                <br />

                <label>Designation:</label>
                <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={order.designation}
                    onChange={handleOnChange}
                />
                {errors.designation && <span className="error">{errors.designation}</span>}
                <br />
                  
                <label>Department:</label>  
                <select
                   id="department"
                   name="department"
                   value={order.department}
                   onChange={handleOnChange}
                  ><option value="">Please select a department</option> 
                   <option value="inventory">Inventory</option>
                   <option value="design">Design</option>
                   <option value="order">Order</option>
                   <option value="supplier">Supplier</option>
                   <option value="Marketing">Marketing</option>
                   <option value="HR">HR</option>
                   <option value="Finance">Finance</option>
                   <option value="Transport">Transport</option>
                   </select>
                   
                {errors.department && <span className="error">{errors.department}</span>}
                <br /> 

                <label>Basic Salary:</label>
                <input
                    type="text"
                    id="basic_salary"
                    name="basic_salary"
                    value={order.basic_salary}
                    onChange={handleOnChange}
                />
                {errors.basic_salary && <span className="error">{errors.basic_salary}</span>}
                <br />

                <label>Allowance:</label>
                <input
                    type="text"
                    id="allownance"
                    name="allownance"
                    value={order.allownance}
                    onChange={handleOnChange}
                />
                {errors.allownance && <span className="error">{errors.allownance}</span>}
                <br />

                <label>Skill Level:</label>
                <input
                    type="text"
                    id="skill_level"
                    name="skill_level"
                    value={order.skill_level}
                    onChange={handleOnChange}
                />
                {errors.skill_level && <span className="error">{errors.skill_level}</span>}
                <br />

                <button id="add-employee-form-btn" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Product;
