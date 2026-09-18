require("dotenv").config();

// bring express in Node.js
const express = require("express");

// installing cors middleware
const cors = require("cors");

// create express app using what we imported
const app = express();
const Task = require("./models/Task")
const User = require("./models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// use cors middleware to handle requests
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log
    ("MongoDB Connected Successfully!");
}).catch((error)=>{
    console.log
    ("MongoDB Connection Failed: ", error.message);
})

app.get("/api/tasks", async (req, res) =>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Tasks"});
    }
});

app.get("/api/tasks/:id", async (req, res)=>{
    try{
        const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({message:"Task Not Found"})
    }
    res.json(task)
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

app.put("/api/tasks/:id", async (req, res)=>{
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {status : req.body.status},
            {new : true}
        );
        if(!task){
            return res.status(404).json({message:"Task Not Found"})
        }
        res.json(task);
    }catch{
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

app.delete("/api/tasks/:id", async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).json({message:"Task Not Found"})
        }
        res.json(deletedTask);
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

app.post("/api/tasks", async (req, res)=>{
    try{
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

// API Route (Testing Backend)
app.get("/", (req, res) => {
    res.send("Backend is Working!!")
});

app.post("/api/register", async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User Registered Successfully",
            user: newUser
        });
    }catch(error){
        res.status(500).json({
            message: "Registration Failed"
        });
    }
})
app.post("/api/login", async (req, res)=>{
    try{
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(404).json({message: "User ghosted"});
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({message: "ur gayyyyy....: )!!"});
      }
      res.json({
        message: "Login Successful",
        user: user
      });
    }catch(error){
      res.status(500).json({
        message: "Login Failed"
      });
    }
  });
    
// start the server and listen to port 5000
app.listen(5000, () => {
    console.log("Server is Running on port 5000");
});