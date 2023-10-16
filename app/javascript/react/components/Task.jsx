import React, { useState, useContext } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Client from "../../client";
import db from "../../db";
import { LoggedInContext } from "./LoggedInContext";

function Task(props) {
	let id = props.id;
	let [description, setDescription] = useState(props.description);
	let [editing, setEditing] = useState(false);
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
	} = useSortable({id: id});
	const loggedIn = useContext(LoggedInContext);

	if (props.completed) {
		label = <p className="mx-5 line-through text-gray-500">{description}</p>
	} else {
		label = <p onClick={(e) => setEditing(true)} className="mx-5">{description}</p>
	}

	const style = {
		transform: CSS.Translate.toString(transform),
		transition ,
	};

	function editTask(id, description) {
		const updated_at = new Date;
		db.tasks.update(id, {description, updated_at});
		if (loggedIn) {
			Client.updateTask(id, {description: description, updated_at});
		}
	}

	function toggleTask(id, completed) {
		const updated_at = new Date;
		if ("vibrate" in navigator) {
			navigator.vibrate(50);
		}
		db.tasks.update(id, {completed, updated_at});
		if (loggedIn) {
			Client.updateTask(id, {completed, updated_at});
		}
	}

	function deleteTask(id) {
		db.tasks.delete(id);
		if (loggedIn) {
			Client.deleteTask(id);
		}
	}


	const handleToggle = (e) => {
		toggleTask(id, e.target.checked);
	}

	const handleNameChange = (e) => {
		setDescription(e.target.value);
	};

	const handleNameBlur = () => {
		if (description.trim() !== "") {
			editTask(id, description);
		}
		setEditing(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === "Escape") {
			handleNameBlur();
		}
	};

	return (
		<li ref={setNodeRef} style={style} className="px-6 py-4 flex items-center justify-between">
			{editing ? (
				<input
					className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
					type="text"
					value={description}
					onChange={handleNameChange}
					onBlur={handleNameBlur}
					onKeyDown={handleKeyDown}
					autoFocus
				/>
			) : (
				<>
					<div className="flex items-center">
						<svg {...attributes} {...listeners} ref={setActivatorNodeRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-5 w-5 h-5 touch-none flex-shrink-0 hover:bg-gray-50 active:bg-gray-50">
							<path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
						</svg>
						<input id={id} type="checkbox" className="rounded-full border-gray-300 text-pink-600 focus:ring-pink-600" checked={props.completed} onChange={handleToggle}/>


						{label}
					</div>
					<button type="button" onClick={() => deleteTask(id)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 flex-shrink-g">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</>
			)}
		</li>
	);
}

export default Task;
