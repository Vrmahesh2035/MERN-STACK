import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  // 1. FETCH tasks from MongoDB when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // 2. ADD a new task to MongoDB
  const addTask = async (newTaskData) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskData),
      });
      if (response.ok) {
        const savedTask = await response.json();
        setTasks((currentTasks) => [...currentTasks, savedTask]);
        return savedTask;
      }

      throw new Error("Unable to add task");
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  // 3. DELETE a task from MongoDB
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Removes it from the screen instantly (notice we use _id for MongoDB)
        setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 4. UPDATE a task's status in MongoDB
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        // Updates the specific task on the screen instantly
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task._id === taskId ? updatedTask : task))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Pass the functions down to your components as props */}
        <Route 
          path="/" 
          element={
            <Dashboard 
              tasks={tasks} 
              addTask={addTask} 
              deleteTask={deleteTask} 
              updateTaskStatus={updateTaskStatus} 
            />
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <Tasks 
              tasks={tasks} 
              deleteTask={deleteTask} 
              updateTaskStatus={updateTaskStatus} 
            />
          } 
        />
        <Route 
          path="/tasks/:id" 
          element={<TaskDetails tasks={tasks} />} 
        />
      </Routes>
    </div>
  );
}

export default App;