import { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask, updateTaskStatus } from './api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    fetchTasks()
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (newTask, onSuccess, onError) => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        status: 'not completed',
      };

      addTask(newTaskObj)
        .then(response => {
          setTasks([...tasks, response.data]);
          onSuccess('Task added successfully');
        })
        .catch(error => {
          console.error('Error adding task:', error);
          onError('Failed to add task');
        });
    }
  };

  const handleDeleteTask = (taskId, onSuccess, onError) => {
    deleteTask(taskId)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
        onSuccess('Task deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        onError('Failed to delete task');
      });
  };

  const handleUpdateTask = (taskId, updatedTask, onSuccess, onError) => {
    updateTask(taskId, updatedTask)
      .then(response => {
        const updatedTask = response.data;
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        onSuccess('Task updated successfully');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        onError('Failed to update task');
      });
  };

  const handleUpdateTaskStatus = (taskId, onSuccess, onError) => {
    updateTaskStatus(taskId)
      .then(response => {
        const updatedTask = response.data;
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        onSuccess('Task completed successfully');
      })
      .catch(error => {
        console.error('Error updating task status:', error);
        onError('Failed to complete task');
      });
  };

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleUpdateTaskStatus,
  };
};
