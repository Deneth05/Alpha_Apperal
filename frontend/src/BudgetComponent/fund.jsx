import { useState } from "react";
import axios from "axios";
import './addfund.css';
import { useNavigate } from 'react-router-dom';

function Fund() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        department: "",
        project: "",
        Allocated_Amount: "",
        spent_amount: "",
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        // Numeric validation for Allocated_Amount and spent_amount
        if ((name === "Allocated_Amount" || name === "spent_amount") && value && isNaN(value)) {
            setErrors((prev) => ({
                ...prev,
                [name]: "This field must be a number.",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
            setOrder((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!order.department) {
            newErrors.department = "Department is required.";
        }

        if (!order.project) {
            newErrors.project = "Project is required.";
        }

        if (!order.Allocated_Amount) {
            newErrors.Allocated_Amount = "Allocated Amount is required.";
        } else if (isNaN(order.Allocated_Amount)) {
            newErrors.Allocated_Amount = "Allocated Amount must be a number.";
        }

        if (!order.spent_amount) {
            newErrors.spent_amount = "Spent Amount is required.";
        } else if (isNaN(order.spent_amount)) {
            newErrors.spent_amount = "Spent Amount must be a number.";
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
            alert("Successfully added!");
            navigate("/funddetails");
            setOrder({
                department: "",
                project: "",
                Allocated_Amount: "",
                spent_amount: "",
            });
            setErrors({});
        } catch (error) {
            console.error("There was an error adding the item:", error);
        }
    };

    return (
        <div className="add-product">
            <h2>Add fund Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Department:</label>
                <select
                    id="department"
                    name="department"
                    value={order.department}
                    onChange={handleOnChange}
                >
                    <option value="">Select a department</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Design">Design</option>
                    <option value="Orders">Orders</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Supplier">Supplier</option>
                    <option value="HR">HR</option>
                    <option value="Transport">Transport</option>
                </select>
                {errors.department && <span className="error">{errors.department}</span>}
                <br />

                <label>Project:</label>
                <input
                    type="text"
                    id="project"
                    name="project"
                    value={order.project}
                    onChange={handleOnChange}
                />
                {errors.project && <span className="error">{errors.project}</span>}
                <br />

                <label>Allocated Amount:</label>
                <input
                    type="text"
                    id="Allocated_Amount"
                    name="Allocated_Amount"
                    value={order.Allocated_Amount}
                    onChange={handleOnChange}
                />
                {errors.Allocated_Amount && <span className="error">{errors.Allocated_Amount}</span>}
                <br />

                <label>Spent Amount:</label>
                <input
                    type="text"
                    id="spent_amount"
                    name="spent_amount"
                    value={order.spent_amount}
                    onChange={handleOnChange}
                />
                {errors.spent_amount && <span className="error">{errors.spent_amount}</span>}
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Fund;
