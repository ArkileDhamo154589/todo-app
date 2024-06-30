import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';
import { useTasks } from './modules/tasks';
import { useModal } from './modules/modal';

Modal.setAppElement('#__next'); // Set the root element for accessibility

export default function Home() {
  const { tasks, handleAddTask, handleDeleteTask, handleUpdateTask, handleUpdateTaskStatus } = useTasks();
  const { editTask, newTask, editStatus, modalIsOpen, openModal, closeModal, setNewTask, setEditStatus } = useModal();
  const [filter, setFilter] = useState('all');

  const addTaskHandler = (e) => {
    e.preventDefault();
    handleAddTask(newTask, (message) => {
      Swal.fire('Success', message, 'success');
      setNewTask('');
    }, (error) => {
      Swal.fire('Error', error, 'error');
    });
  };

  const updateTaskHandler = (e) => {
    e.preventDefault();
    handleUpdateTask(editTask.id, { ...editTask, text: newTask, status: editStatus }, (message) => {
      Swal.fire('Success', message, 'success');
      closeModal();
    }, (error) => {
      Swal.fire('Error', error, 'error');
    });
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
      cell: row => (
        <div>
          <div className={row.status === 1 ? 'green-text' : 'red-text'}>
            {row.status === 1 ? 'completed' : 'not completed'}
          </div>
          {row.status === 0 && (
            <button 
              className="button complete" 
              onClick={() => handleUpdateTaskStatus(row.id, (message) => {
                Swal.fire('Success', message, 'success');
              }, (error) => {
                Swal.fire('Error', error, 'error');
              })}
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
          <FaEdit className="icon" onClick={() => openModal(row)} />
          <FaTrash className="icon" onClick={() => handleDeleteTask(row.id, (message) => {
            Swal.fire('Success', message, 'success');
          }, (error) => {
            Swal.fire('Error', error, 'error');
          })} />
        </div>
      ),
    },
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') {
      return true;
    }
    return filter === 'completed' ? task.status === 1 : task.status === 0;
  });

  return (
    <div className="container">
      <div className='seperator'>
        <div className='left-side'>
      <h1>TODO List</h1>
      <form onSubmit={editTask ? updateTaskHandler : addTaskHandler}>
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className='add-new' type="submit">{editTask ? 'Update Task' : 'Add'}</button>
      </form>
      </div>
      <div className='right-side'>      
        <div className='filters'>
        <label htmlFor="filter">Filter tasks: </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
        </div>
      
      
      <DataTable
      className="data-table"
        columns={columns}
        data={filteredTasks}
        pagination
        noDataComponent="No tasks available"
      />
      </div>

      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Task</h2>
        <form onSubmit={updateTaskHandler}>
          <input 
            type="text" 
            placeholder="Task name" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
            <option value={0}>Not Completed</option>
            <option value={1}>Completed</option>
          </select>
          <button className='submit' type="submit">Update</button>
        </form>
        <button className='cancel' onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}
