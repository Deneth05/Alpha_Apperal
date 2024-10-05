import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateTask.css';

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    type: "",
        request: "",
  });

  useEffect(() => {
    const fetchTaskData = async () => {
        try {
            const response = await fetch(`http://localhost:8020/item_order_s/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setTask(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [id]);

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      task.is_complete=true;
      const response = await fetch(`http://localhost:8020/item_update_s`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: task._id,
          ...task,
          status: 'completed', // Update task status to completed
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Status Completed Successfully');
        navigate('/allrequests'); // Redirect back to AllTask after update
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
 
  return (
    <div className='task-update-form'>
      <h1 id="task-main-topic-of-form">Accept Request </h1>
      <label>Type:</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                   
                   
                    onChange={handleInputChange} value={task?.type} readOnly
                />
              
                <br />

                <label>Request:</label>
                <input
                    type="text"
                    id="request"
                    name="request"
                    onChange={handleInputChange} value={task?.request} readOnly
                />
            
                <br />

   

      <button className='update-btn' onClick={handleUpdate} >Accept</button>
    </div>
  );
}

export default UpdateTask;
