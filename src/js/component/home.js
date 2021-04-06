import React, { useState } from "react";

//include images into your bundle

//create your first component
export function Home() {
	const [tasksArray, setTaskArray] = useState([]);
	const [newTask, setNewTask] = useState([""]);
	const saveTask = e => {
		if (e.keyCode == 13) {
			let newToDo = {
				label: newTask,
				done: false
			};
			setTaskArray([...tasksArray, newToDo]);
			setNewTask("");
			fetch("https://assets.breatheco.de/apis/fake/todos/user/Davon", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([...tasksArray, newToDo])
			})
				.then(response => response.json())
				.then(jsonfied => {
					console.log(jsonfied);
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/Davon"
					)
						.then(response => response.json())
						.then(data => setTaskArray(data))
						.catch(error =>
							console.log("there was a following error: ", error)
						);
				})
				.catch(error =>
					console.log("there was a following error:", error)
				);
		}
	};

	const deleteTask = index => {
		const result = tasksArray.filter((task, i) => i != index);
		setTaskArray(result);
		//fetch withu put method, in thue body of thue fetch pass taskarray
		// method
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Davon", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result)
		})
			.then(response => response.json())
			.then(jsonfied => {
				console.log(jsonfied);
				fetch("https://assets.breatheco.de/apis/fake/todos/user/Davon")
					.then(response => response.json())
					.then(data => setTaskArray(data))
					.catch(error =>
						console.log("there was a following error: ", error)
					);
			})
			.catch(error => console.log("there was a following error:", error));
	};

	// fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
	// method: "PUT",
	// body: JSON.stringify(todos),
	// headers: {
	// "Content-Type": "application/json"
	// }
	// })
	// .then(resp => {
	// console.log(resp.ok); // will be true if the response is successfull
	// console.log(resp.status); // the status code = 200 or code = 400 etc.
	// console.log(resp.text()); // will try return the exact result as string
	// return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
	// })
	// .then(data => {
	// //here is were your code should start after the fetch finishes
	// console.log(data); //this will print on the console the exact object received from the server
	// })
	// .catch(error => {
	// //error handling
	// console.log(error);
	// });

	return (
		<div className="text-center mt-5">
			<input
				type="text"
				value={newTask}
				onChange={e => setNewTask(e.target.value)}
				onKeyUp={saveTask}
			/>
			<ul>
				{tasksArray.length > 0 ? (
					tasksArray.map((task, i) => {
						return (
							<li key={i}>
								{task.label}{" "}
								<span
									type="button"
									onClick={() => deleteTask(i)}>
									{" "}
									X
								</span>
							</li>
						);
					})
				) : (
					<li>no tasks, add a task</li>
				)}
			</ul>

			<p>{tasksArray.length} items left</p>
		</div>
	);
}
