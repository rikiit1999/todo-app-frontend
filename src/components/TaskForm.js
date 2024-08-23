import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ fetchTasks }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

      await axios.post('http://localhost:5000/api/tasks', { description, category, dueDate }, {
          headers: {
              'x-auth-token': token // Gửi token trong header
          }
      });

      setDescription(''); // Clear the input field
      setCategory(''); // Clear the input field
      setDueDate(''); // Clear the input field
      fetchTasks(); // Fetch the updated list of tasks
    } catch (error) {
      console.error("Error adding task:", error);
    }
    
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="input-field"
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        className="input-field"
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        className="input-field"
      />
      <button type="submit" className="submit-button">Save</button>
    </form>
  );
};

export default TaskForm;