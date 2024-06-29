import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const AddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        status: 'not completed',
      };

      axios.post('http://localhost:8000/tasks', newTaskObj)
        .then(response => {
          setTasks([...tasks, response.data]); 
          setNewTask(''); 
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const DeleteTask = (taskId) => {
    axios.delete(`http://localhost:8000/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const columns = [
    {
      name: 'Task Name',
      selector: row => row.text,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Delete',
      cell: row => <button onClick={() => DeleteTask(row.id)}>Delete Task</button>
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>TODO List</h1>
      <form onSubmit={AddTask} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: '10px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Add</button>
      </form>
      <DataTable
        columns={columns}
        data={tasks}
        noDataComponent="No tasks available"
      />
    </div>
  );
}
