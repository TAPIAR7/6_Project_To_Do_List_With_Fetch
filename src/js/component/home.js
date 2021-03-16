import React, { useState, useEffect } from "react";

//include images into your bundle

//create your first component
export function Home() {
	const [task, setTask] = useState("");
	const [listTask, setListTask] = useState([]);
	const [showItem, setshowItem] = useState(null);

	useEffect(() => {
		getTask();
	}, []);
	function getTask() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rtapia",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setListTask(result))
			.catch(error => console.log("error", error));
	}

	const putData = newData => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(newData);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/rtapia",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};

	// Handle when user press the enter key and create a new element.
	const handleOnKeyPress = e => {
		if (e.key === "Enter") {
			let index = listTask.length;
			console.log(index);
			console.log("Me preseionaste" + task);
			let temp = {
				id: index,
				label: task,
				done: false
			};
			setListTask([...listTask, temp]);
			console.log(listTask);
			setTask("");
		}
	};

	// Delete function
	const deleteItem = event => {
		console.log("Donde lo genero: " + event.target.id);
		const result = listTask.filter(function(item) {
			console.log("filtro" + item.id);
			return item.id != event.target.id;
		});
		let result2 = result.map((item, index) => {
			item.id = index;
			return item;
		});
		console.log(result);
		console.log(result2);
		setListTask(result2);
	};

	// Change visible or insivible
	const visibleorNot = id => {
		let visible = "fas fa-times float-right visible";
		let invisible = "fas fa-times float-right invisible";
		if (id != showItem) {
			return invisible;
		} else {
			return visible;
		}
	};
	const NotVisible = id => {
		setshowItem(null);
	};
	return (
		<div className="mx-5 mt-5">
			{putData(listTask)}
			<h1 className="text-center">TO DO LIST</h1>
			<input
				type="text"
				placeholder="Enter your task"
				className="form-control mb-2 text-secondary"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyPress={e => handleOnKeyPress(e)}></input>
			<ul className="list-group">
				{listTask.map((item, index) => {
					console.log(index);
					console.log(item);
					return (
						<li
							onMouseOver={e => {
								setshowItem(e.target.id);
							}}
							onMouseOut={NotVisible}
							key={index}
							id={index}
							className="list-group-item">
							{item.label}
							<i
								id={index}
								onClick={e => deleteItem(e)}
								className={visibleorNot(index)}></i>
						</li>
					);
				})}
			</ul>
			<div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item text-secondary">
						{listTask.length + " left"}
					</li>
				</ul>
			</div>
		</div>
	);
}
