import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the root element for accessibility

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:8000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (e) => {
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
          Swal.fire('Success', 'Task added successfully', 'success');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const deleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/tasks/${taskId}`)
          .then(() => {
            setTasks(tasks.filter(task => task.id !== taskId));
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          })
          .catch(error => console.error('Error deleting task:', error));
      }
    });
  };

  const updateStatus = (taskId) => {
    axios.put(`http://localhost:8000/tasks/${taskId}/status`, { status: 'completed' })
      .then(response => {
        const updatedTask = response.data;
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        Swal.fire('Success', 'Task completed successfully', 'success');
      })
      .catch(error => console.error('Error updating task status:', error));
  };

  const editTaskHandler = (task) => {
    setEditTask(task);
    setNewTask(task.text);
    setEditStatus(task.status);
    setModalIsOpen(true);
  };

  const updateTask = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/tasks/${editTask.id}`, { ...editTask, text: newTask, status: editStatus })
      .then(response => {
        const updatedTask = response.data;
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        setEditTask(null);
        setNewTask('');
        setEditStatus('');
        setModalIsOpen(false);
        Swal.fire('Success', 'Task updated successfully', 'success');
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') {
      return true;
    }
    return task.status === filter;
  });

  const columns = [
    {
      name: 'Task Name',
      selector: row => row.text,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      cell: row => (
        <div>
          <div>{row.status}</div>
          {row.status === 'not completed' && (
            <button 
              className="button complete" 
              onClick={() => updateStatus(row.id)}
            >
              Complete Task
            </button>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="actions">
          <FaEdit className="icon" onClick={() => editTaskHandler(row)} />
          <FaTrash className="icon" onClick={() => deleteTask(row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>TODO List</h1>
      <form onSubmit={editTask ? updateTask : addTask}>
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">{editTask ? 'Update Task' : 'Add'}</button>
      </form>
      <div>
        <label htmlFor="filter">Filter tasks: </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <DataTable
        columns={columns}
        data={filteredTasks}
        pagination
        noDataComponent="No tasks available"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Task"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Task</h2>
        <form onSubmit={updateTask}>
          <input 
            type="text" 
            placeholder="Task name" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit">Update</button>
        </form>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}
