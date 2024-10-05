import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './fundupdate.css';
import { useNavigate } from 'react-router-dom';

function Updatefund() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateorder, setupdateorder] = useState({
        department: "",
        project: "",
        Allocated_Amount: "",
        spent_amount: "",
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

        // Validate department field
        if (!updateorder.department) {
            newErrors.department = "Department is required.";
        }

        // Validate project field
        if (!updateorder.project) {
            newErrors.project = "Project is required.";
        }

        // Validate Allocated_Amount field
        if (!updateorder.Allocated_Amount) {
            newErrors.Allocated_Amount = "Allocated amount is required.";
        } else if (isNaN(updateorder.Allocated_Amount)) {
            newErrors.Allocated_Amount = "Allocated amount must be a number.";
        }

        // Validate spent_amount field
        if (!updateorder.spent_amount) {
            newErrors.spent_amount = "Spent amount is required.";
        } else if (isNaN(updateorder.spent_amount)) {
            newErrors.spent_amount = "Spent amount must be a number.";
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

    const handleUpdate = async () => {
        const newErrors = validate();

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
                navigate("/funddetails");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
   
    return (
        <div className='item-update'>
            <h2>Update fund Form</h2>

            <label>Department:</label>
            <input 
                type="text" 
                id="department" 
                name="department" 
                onChange={handleInputChange} 
                value={updateorder?.department} 
            />
            {errors.department && <span className="error">{errors.department}</span>}
            <br />

            <label>Project:</label>
            <input 
                type="text" 
                id="project" 
                name="project" 
                onChange={handleInputChange} 
                value={updateorder?.project} 
            />
            {errors.project && <span className="error">{errors.project}</span>}
            <br />

            <label>Allocated Amount:</label>
            <input 
                type="text" 
                id="Allocated_Amount" 
                name="Allocated_Amount" 
                onChange={handleInputChange} 
                value={updateorder?.Allocated_Amount} 
            />
            {errors.Allocated_Amount && <span className="error">{errors.Allocated_Amount}</span>}
            <br />

            <label>Spent Amount:</label>
            <input 
                type="text" 
                id="spent_amount" 
                name="spent_amount" 
                onChange={handleInputChange} 
                value={updateorder?.spent_amount} 
            />
            {errors.spent_amount && <span className="error">{errors.spent_amount}</span>}
            <br />

            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default Updatefund;
