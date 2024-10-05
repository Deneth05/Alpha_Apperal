import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import './itemupdate.css';

function UpdateItem() {
    const navigate=useNavigate();
    const { id } = useParams();
    const [updateorder, setupdateorder] = useState({
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8020/item_order/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setupdateorder(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);
    const validate = () => {
        const newErrors = {};

        // Full Name validation
        if (!updateorder.fname.trim()) {
            newErrors.fname = "Full Name is required.";
        }

        // Email validation
        if (!updateorder.emaill.trim()) {
            newErrors.emaill = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(updateorder.emaill)) {
            newErrors.emaill = "Email address is invalid.";
        }

        // ID Number validation
        if (!updateorder.idnumber.trim()) {
            newErrors.idnumber = "ID Number is required.";
        }

        // Document 1 validation
        if (!updateorder.doc1) {
            newErrors.doc1 = "Document 1 is required.";
        }

        // Document 2 validation
        if (!updateorder.doc2) {
            newErrors.doc2 = "Document 2 is required.";
        }

        // Document 3 validation
        if (!updateorder.doc3) {
            newErrors.doc3 = "Document 3 is required.";
        }

        // Joined Date validation
        if (!updateorder.join_date.trim()) {
            newErrors.join_date = "Joined Date is required.";
        }

        // Designation validation
        if (!updateorder.designation.trim()) {
            newErrors.designation = "Designation is required.";
        }

        // Department validation
        if (!updateorder.department.trim()) {
            newErrors.department = "Department is required.";
        }

        // Basic Salary validation
        if (!updateorder.basic_salary.trim()) {
            newErrors.basic_salary = "Basic Salary is required.";
        } else if (isNaN(updateorder.basic_salary)) {
            newErrors.basic_salary = "Basic Salary must be a number.";
        }

        // Allowance validation
        if (!updateorder.allownance.trim()) {
            newErrors.allownance = "Allowance is required.";
        } else if (isNaN(updateorder.allownance)) {
            newErrors.allownance = "Allowance must be a number.";
        }

        // Skill Level validation
        if (!updateorder.skill_level.trim()) {
            newErrors.skill_level = "Skill Level is required.";
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state
        setupdateorder((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear individual field errors on change
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Handle Update Submission
    const handleUpdate = async () => {
        const newErrors = validate();

        // If validation errors exist, stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8020/item_update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updateorder._id,
                    ...updateorder,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Item updated successfully");
                navigate('/itemdetails')
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div id='employee-item-update'>
            <h2>Update Employee</h2>

            <label>Full Name:</label>
            <input
                type="text"
                id="fname"
                name="fname"
                onChange={handleInputChange} 
                value={updateorder.fname}
            />
            {errors.fname && <span className="error">{errors.fname}</span>}
            <br />

            <label>Email:</label>
            <input
                type="text"
                id="emaill"
                name="emaill"
                onChange={handleInputChange} 
                value={updateorder.emaill}
            />
            {errors.emaill && <span className="error">{errors.emaill}</span>}
            <br />

            <label>ID Number:</label>
            <input
                type="text"
                id="idnumber"
                name="idnumber"
                onChange={handleInputChange} 
                value={updateorder.idnumber}
            />
            {errors.idnumber && <span className="error">{errors.idnumber}</span>}
            <br />

            <label>Document 1:</label>
            <input
                type="file"
                id="doc1"
                name="doc1"
                onChange={handleInputChange}
            />
            {errors.doc1 && <span className="error">{errors.doc1}</span>}
            <br />

            <label>Document 2:</label>
            <input
                type="file"
                id="doc2"
                name="doc2"
                onChange={handleInputChange}
            />
            {errors.doc2 && <span className="error">{errors.doc2}</span>}
            <br />

            <label>Document 3:</label>
            <input
                type="file"
                id="doc3"
                name="doc3"
                onChange={handleInputChange}
            />
            {errors.doc3 && <span className="error">{errors.doc3}</span>}
            <br />

            <label>Joined Date:</label>
            <input
                type="date"
                id="join_date"
                name="join_date"
                onChange={handleInputChange} 
                value={updateorder.join_date}
            />
            {errors.join_date && <span className="error">{errors.join_date}</span>}
            <br />

            <label>Designation:</label>
            <input
                type="text"
                id="designation"
                name="designation"
                onChange={handleInputChange} 
                value={updateorder.designation}
            />
            {errors.designation && <span className="error">{errors.designation}</span>}
            <br />

            <label>Department:</label>
            <input
                type="text"
                id="department"
                name="department"
                onChange={handleInputChange} 
                value={updateorder.department}
            />
            {errors.department && <span className="error">{errors.department}</span>}
            <br />

            <label>Basic Salary:</label>
            <input
                type="text"
                id="basic_salary"
                name="basic_salary"
                onChange={handleInputChange} 
                value={updateorder.basic_salary}
            />
            {errors.basic_salary && <span className="error">{errors.basic_salary}</span>}
            <br />

            <label>Allowance:</label>
            <input
                type="text"
                id="allownance"
                name="allownance"
                onChange={handleInputChange} 
                value={updateorder.allownance}
            />
            {errors.allownance && <span className="error">{errors.allownance}</span>}
            <br />

            <label>Skill Level:</label>
            <input
                type="text"
                id="skill_level"
                name="skill_level"
                onChange={handleInputChange} 
                value={updateorder.skill_level}
            />
            {errors.skill_level && <span className="error">{errors.skill_level}</span>}
            <br />

            <button id='employee-update-btn' onClick={handleUpdate}>Update</button>
            <br/>
            <br/>

        </div>
    );
}

export default UpdateItem;
