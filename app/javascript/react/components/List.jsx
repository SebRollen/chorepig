import React from "react";
import Task from "./Task"
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAutoAnimate } from '@formkit/auto-animate/react'

function List({tasks, animationsEnabled}) {
  const [parent, enableAnimations] = useAutoAnimate({ duration: 100 });
  enableAnimations(animationsEnabled);
  const tasksList = tasks.map((task) => <Task key={task.id} id={task.id} description={task.description} completed={task.completed} position={task.position}/>);
  const taskIds = tasks.map((t) => t.id);

  return(
	<SortableContext
	  items={taskIds}
	  strategy={verticalListSortingStrategy}
	>
	  <div className="px-4 py-2 sm:px-6">
		<div className="overflow-hidden rounded-md bg-white shadow">
		  <ul ref={parent} id="tasks" className="divide-y divide-gray-200">
			{tasksList}
		  </ul>
		</div>
	  </div>
	</SortableContext>
  )
}
export default List;
