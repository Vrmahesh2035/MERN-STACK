import { useParams } from "react-router-dom";

function TaskDetails({ tasks }) {
	const { id } = useParams();
	const task = tasks.find((currentTask) => currentTask._id === id);

	if (!task) {
		return <p>Task not found.</p>;
	}

	return (
		<main>
			<h1>{task.title}</h1>
			<p>{task.description}</p>
			<p>Status: {task.status}</p>
		</main>
	);
}

export default TaskDetails;
