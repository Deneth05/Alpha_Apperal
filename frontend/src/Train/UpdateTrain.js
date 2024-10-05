import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import './Trainupdate.css';

function UpdateTrainer() {
    const { id } = useParams();
    const navigate=useNavigate();
    const [updateorder, setupdateorder] = useState({
        usersname: "",
        trainname: "",
        description: "",
        sheduleDate: "",
        sheduleTime: "",
        releventDepartment: "",
        options: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8020/trainer_order/${id}`);
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
       

        // If validation errors exist, stop submission
      

        try {
            const response = await fetch(`http://localhost:8020/trainer_update`, {
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
                navigate('/traindetails')
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='item-update'>
            <h2>Update Training Details</h2>

            <label>Users Name:</label>
            <input
                type="text"
                name="usersname"
                onChange={handleInputChange}
                value={updateorder.usersname}
            />
            {errors.username && <span className="error">{errors.username}</span>}
            <br />

            <label>Train Name:</label>
            <input
                type="text"
                name="trainname"
                onChange={handleInputChange}
                value={updateorder.trainname}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <br />

            <label>Description:</label>
            <input
                type="text"
                name="description"
                onChange={handleInputChange}
                value={updateorder.description}
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <br />

            <label>Schedule Date:</label>
            <input
                type="text"
                name="sheduleDate"
                onChange={handleInputChange}
                value={updateorder.sheduleDate}
            />
            {errors.address && <span className="error">{errors.address}</span>}
            <br />

            <label>Schedule Time:</label>
            <input
                type="text"
                name="sheduleTime"
                onChange={handleInputChange}
                value={updateorder.sheduleTime}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
            <br />
            <label>Relevant Department:</label>
            <input
                type="text"
                name="releventDepartment"
                onChange={handleInputChange}
                value={updateorder.releventDepartment}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
            <br />
         
            <br />
            <label>Options:</label>
            <input
                type="text"
                name="options"
                onChange={handleInputChange}
                value={updateorder.options}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
            <br />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default UpdateTrainer;
