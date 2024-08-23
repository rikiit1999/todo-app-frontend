import React from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = ({ tasks, fetchTasks }) => {

  // Hàm để xóa task
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          'x-auth-token': token // Gửi token trong header
        }
      });

      fetchTasks(); // Fetch lại danh sách task sau khi xóa
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Hàm để đánh dấu hoàn thành task
  const handleToggleComplete = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

      await axios.put(`http://localhost:5000/api/tasks/${id}`, {}, {
        headers: {
          'x-auth-token': token // Gửi token trong header
        }
      });

      fetchTasks(); // Fetch lại danh sách task sau khi cập nhật
    } catch (error) {
      console.error("Error toggling complete status:", error);
    }
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className="task-item" key={task._id}>
          <div className="task-info">
            <span className="task-description">{task.description}</span>
            <span className="task-category">{task.category}</span>
            <span className="task-due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="task-actions">
            <button className="complete-button" onClick={() => handleToggleComplete(task._id)}>
              {task.isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
            <button className="delete-button" onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
