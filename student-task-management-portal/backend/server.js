require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected Successfully!");
  app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
  });
}

// 2. Fetch all tasks from MongoDB
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Tasks" });
  }
});

// 3. Fetch a single task by its MongoDB _id
app.get("/api/tasks/:id", async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found!" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Invalid Task ID or Fetch Error" });
  }
});

// 4. Create and save a new task to MongoDB
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error: error.message });
  }
});

// 5. Update an existing task in MongoDB
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task Not Found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task" });
  }
});

// 6. Delete a task from MongoDB
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task Not Found" });
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// 7. Health Check Route
app.get("/", (req, res) => {
  res.send("Backend is Working!!");
});

startServer().catch((error) => {
  console.error("MongoDB Connection Failed:", error.message);
  process.exit(1);
});