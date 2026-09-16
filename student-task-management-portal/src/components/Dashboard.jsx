import Welcome from "./Welcome";
import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {

    async function toggleTask(id){
        const task = props.tasks.find((task) => task.id === id);
        const nextStatus = task.status === "Completed" ? "Pending" : "Completed";

        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: nextStatus })
        });

        if (!response.ok) {
            throw new Error("Unable to update task status");
        }

        const updatedTask = await response.json();
        props.setTasks(
            props.tasks.map((currentTask) =>
                currentTask.id === id ? updatedTask : currentTask
            )
        );
    }

    function addTask(newTask){
        props.setTasks([...props.tasks, newTask]);
    }

    async function deleteTask(id){
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete task");
        }

        props.setTasks(
            props.tasks.filter((task)=>task.id !==id)
        );
    }

    const completedTasks = props.tasks.filter((task) => task.status === "Completed").length;
    const pendingTasks = props.tasks.length - completedTasks;

    return (
        <>
        <Welcome/>
        <main>
        
            <div className="stats-container">
                <StatCard title="Total Tasks" value={props.tasks.length}/>
                <StatCard title="Completed" value={completedTasks}/>
                <StatCard title="Pending" value={pendingTasks}/>
                
            </div>

            <AddTask  onAddTask={addTask}/>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {props.tasks.map((task)=>(
                    <TaskCard 
                        key={task.id} 
                        id ={task.id}
                        title={task.title} 
                        description={task.description} 
                        status={task.status}
                        onToggle={()=>toggleTask(task.id)} 
                        onDelete={()=>deleteTask(task.id)}
                    />
                ))};
            </div>

        </main>
        </>
    );
}

export default Dashboard;