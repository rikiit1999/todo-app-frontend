import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';
import './App.css';
import Login from './components/Login';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchTasks = async () => {
    try {
        const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
              'x-auth-token': token // Send token to header
          }
      });
        setTasks(response.data);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks(); // only fetch when user logins
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("Login successful, isLoggedIn set to true");
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <TaskForm fetchTasks={fetchTasks} />
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </>
      )}
    </div>
  );
}

export default App;