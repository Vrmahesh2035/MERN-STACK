// bring express in Node.js
const express = require("express");

// installing cors middleware
const cors = require("cors");

// create express app using what we imported
const app = express();

// use cors middleware to handle requests
app.use(cors());
app.use(express.json());

const tasks = [
    {
        id:1,
        title:"Learn React",
        description:"Understanding Components",
        status: "Completed"
    },
    {
        id:2,
        title:"Learn JavaScript",
        description:"Understanding Variables, Functions",
        status: "Pending"
    }   
];

app.get("/api/tasks", (req, res) =>{
    res.json(tasks);
});

app.get("/api/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find((task)=> task.id === id);
    if(!task){
        return res.status(404).json({message : "Task not found!"});
    }
    res.json(task);
})

app.put("/api/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find((task) =>task.id === id);
    if(!task){
        return res.status(404).json({message : "Task not found!"});
    }
    task.status = req.body.status;
    res.json(task);
    
})

app.delete("/api/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if(taskIndex === -1){
        return res.status(404).json({message : "Task not found!"});
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
})

app.post("/api/tasks", (req, res)=>{
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
})

// API Route (Testing Backend)
app.get("/", (req, res) => {
    res.send("Backend is Working!!")
});

// start the server and listen to port 5000
app.listen(5000, () => {
    console.log("Server is Running on port 5000");
});