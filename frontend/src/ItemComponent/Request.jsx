import { useState } from "react";
import axios from "axios";
import './additem.css';
import { useNavigate } from 'react-router-dom';

function Request() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        type: "",
        request: "",
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        // Validate Type
        if (!order.type) {
            newErrors.type = "Type is required.";
        } else if (order.type.length < 3) {
            newErrors.type = "Type must be at least 3 characters.";
        }

        // Validate Request
        if (!order.request) {
            newErrors.request = "Request is required.";
        } else if (order.request.length < 10) {
            newErrors.request = "Request must be at least 10 characters.";
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
            const response = await axios.post("http://localhost:8020/item_create_s", order);
            console.log(response.data);

            alert("Request submitted successfully!");
            setOrder({
                type: "",
                request: "",
            });
            setErrors({});
            navigate("/allrequests");
        } catch (error) {
            console.error("There was an error submitting the request:", error);
        }
    };

    return (
        <div className="add-request">
            <h2>Add Request</h2>
            <form onSubmit={handleSubmit} id="ticket-form">
                <label>Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={order.type}
                    onChange={handleOnChange}
                />
                {errors.type && <span className="error">{errors.type}</span>}
                <br />

                <label>Request:</label>
                <input
                    type="text"
                    id="request"
                    name="request"
                    value={order.request}
                    onChange={handleOnChange}
                />
                {errors.request && <span className="error">{errors.request}</span>}
                <br />

                <button type="submit">Submit</button>
            </form>
            <br />
        </div>
    );
}

export default Request;
