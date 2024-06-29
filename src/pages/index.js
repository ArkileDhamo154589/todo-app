import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const columns = [
    {
      name: 'Task Name',
      selector: row => row.text,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.text , 
      sortable: true,
    },
     {
      name: 'Delete',
      cell: row => <button>Delete Task</button>
     },
  ];
  return (
    <div>
      <h1>TODO List</h1>
      <form>
        <input type="text" placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>
      <DataTable
        columns = {columns}
        data = {tasks}
        noDataComponent ="No tasks available"
      />
    </div>
  );
}
