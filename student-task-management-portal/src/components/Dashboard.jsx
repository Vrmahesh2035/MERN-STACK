import Welcome from "./Welcome";
import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {

    function toggleTask(id){
        props.setTasks(
            props.tasks.map((task) => {
                if(task.id === id){
                    return {...task, 
                        status: task.status === "Completed" 
                                    ? "Pending" 
                                    : "Completed"
                    };
                }
                return task;
            })
        );
    }

    function addTask(newTask){
        props.setTasks([...props.tasks, newTask]);
    }

    function deleteTask(id){
        props.setTasks(
            props.tasks.filter((task)=>task.id !==id)
        );
    }

    return (
        <>
        <Welcome/>
        <main>
        
            <div className="stats-container">
                <StatCard title="Total Tasks" value="10"/>
                <StatCard title="Completed" value="6"/>
                <StatCard title="Pending" value="4"/>
                
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