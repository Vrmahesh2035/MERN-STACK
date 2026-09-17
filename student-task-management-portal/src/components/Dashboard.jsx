import Welcome from "./Welcome";
import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {

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

            <AddTask onAddTask={props.addTask}/>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {props.tasks.map((task)=>(
                    <TaskCard 
                        key={task._id}
                        id={task._id}
                        title={task.title} 
                        description={task.description} 
                        status={task.status}
                        onToggle={() => props.updateTaskStatus(
                            task._id,
                            task.status === "Completed" ? "Pending" : "Completed"
                        )}
                        onDelete={() => props.deleteTask(task._id)}
                    />
                ))}
            </div>

        </main>
        </>
    );
}
 
export default Dashboard;