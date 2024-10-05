import { useState, useEffect } from 'react';
import {  Table } from 'flowbite-react';
import axios from 'axios';

import './AllTasks.css';
import { Link } from 'react-router-dom';

export default function AllTask() {
  const [tasks, setTasks] = useState([]);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
        const data = await axios.get('http://localhost:8020/item_s');
        console.log(data.data.success);
        if (data.data.success) {
            setTasks(data.data.data);
        }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handledelete = async (id) => {
    const data = await axios.delete('http://localhost:8020/item_delete_s/' + id);
    if (data.data.success) {
      fetchTasks();
        console.log(data.data.message);
        alert('Item  deleted Successfully!');
    }
};
  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  return (
    <div className='task-table-auto'>
      <h2 className="my-8 text-center font-bold text-4xl text-gray-800">All  Status</h2>
    

      {tasks.length > 0 ? ( 
        <Table hoverable id='task-all-details-table'>
          <Table.Head id="task-all-details-table-head">
            <Table.HeadCell>Department</Table.HeadCell>
            <Table.HeadCell>Request</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body id="task-details-table-body">
      
            {tasks.map((task) => (
              <Table.Row key={task._id} >
                <Table.Cell>{task.type}</Table.Cell>
                <Table.Cell>{task.request}</Table.Cell>
       
                <Table.Cell>
                  <Link to={`/update-task/${task._id}`} id='task-one-details-update-btn'    onClick={() => handleCompleteTask(task._id)}>
                  
                      Accept
                   
                  </Link>
                  <button
                      id="task-one-details-statues-btn"
                      style={{ backgroundColor: task.is_complete ? 'red' : 'yellow' }}
                    >
                   {task.is_complete ? 'Completed' : 'Pending'}
                  </button>
                  <button onClick={() => handledelete(task._id)}>Delete </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no tasks yet!</p>
      )}

    </div>
  );
}
