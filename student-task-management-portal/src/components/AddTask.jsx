import { useState } from "react";

function AddTask(props){
    const [title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        const newTask = {
            title: title,
            description: description,
            status: "Pending"
        };
        try{
            await props.onAddTask(newTask);
            setTitle("");
            setDescription("");
        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Add Title: </label>
                <input 
                    type="text"   
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <br /><br />
                <label>Add Description: </label>
                <input 
                    type="text" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <br /><br />
                <button type="submit">Add Task!</button>
            </form>
        </div>
    );
}
export default AddTask;