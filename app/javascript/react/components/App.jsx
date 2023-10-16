import React from "react";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Form from "./Form";
import List from "./List";
import { LoggedInContext } from "./LoggedInContext";
import WelcomeModal from "./WelcomeModal";
import Client from "../../client";
import db from "../../db";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

function App () {
	const reactiveTasks = useLiveQuery(
		() => db.tasks.toCollection().sortBy('position')
	);
	const [animationsEnabled, setAnimationsEnabled] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [tasks, setTasks] = useState([]);
	const taskIds = tasks.map((t) => t.id);

	function updateFromEvent(event) {
		switch (event.action) {
			case 'created':
				db.tasks.add(event.content);
				break;
			case 'updated':
				db.tasks.update(event.task_id, event.content);
				break;
			case 'deleted':
				db.tasks.delete(event.task_id);
				break;
		}
	}

	async function getEventsAndUpdate() {
		let events = await Client.getEvents(localStorage.getItem("chore-pig-event-cursor") || 0);
		events.data.forEach((event) => {
			updateFromEvent(event)
		})
		if (events.data.length > 0) {
			localStorage.setItem('chore-pig-event-cursor', events.data.pop().id);
		}
	}

	useEffect(() => {
		if (reactiveTasks) {
			setAnimationsEnabled(true);
			setTasks(reactiveTasks);
		}
	}, [reactiveTasks]);

	useEffect(() => {
		if (loggedIn) {
			getEventsAndUpdate();
		}
	}, [loggedIn]);

	useEffect(() => {
		setLoggedIn(document.getElementById('loggedIn').value === 'true');
	}, []);


	function handleDragEnd(event) {
		const {active, over} = event;

		if (active.id !== over.id) {
			setAnimationsEnabled(false);

			const oldPosition = tasks[taskIds.indexOf(active.id)].position;
			const newPosition = tasks[taskIds.indexOf(over.id)].position;
			const updated_at = new Date;
			if (newPosition > oldPosition) {
				db.tasks.where('position').between(oldPosition, newPosition, false, true).modify(task => --task.position)
			} else {
				db.tasks.where('position').between(newPosition, oldPosition, true, false).modify(task => ++task.position)
			}
			db.tasks.update(active.id, { position: newPosition, updated_at})
			setTasks(arrayMove(tasks, taskIds.indexOf(active.id), taskIds.indexOf(over.id)));
		}
	}

	return (
		<LoggedInContext.Provider value={loggedIn}>
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]} >
				<List animationsEnabled={animationsEnabled} tasks={tasks} />
				<Form tasks={tasks}/>
				<WelcomeModal />
			</DndContext>
		</LoggedInContext.Provider>
	)
}

export default App;
