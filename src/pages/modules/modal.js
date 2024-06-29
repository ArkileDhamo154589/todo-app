import { useState } from 'react';

export const useModal = () => {
  const [editTask, setEditTask] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (task) => {
    setEditTask(task);
    setNewTask(task.text);
    setEditStatus(task.status);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditTask(null);
    setNewTask('');
    setEditStatus('');
    setModalIsOpen(false);
  };

  return {
    editTask,
    newTask,
    editStatus,
    modalIsOpen,
    openModal,
    closeModal,
    setNewTask,
    setEditStatus,
  };
};
