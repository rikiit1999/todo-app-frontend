import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
              'x-auth-token': token
          }
      });
      setTasks(response.data);
  };

  const handleLoginSuccess = () => {
      setIsLoggedIn(true);
      fetchTasks();
  };

  const handleRegisterSuccess = () => {
      setShowRegister(false);
  };

  return (
      <div className="App">
          <h1>ToDo List</h1>
          {!isLoggedIn ? (
              showRegister ? (
                  <Register onRegisterSuccess={handleRegisterSuccess} switchToLogin={() => setShowRegister(false)} />
              ) : (
                  <Login onLoginSuccess={handleLoginSuccess} switchToRegister={() => setShowRegister(true)} />
              )
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