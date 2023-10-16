import React, { useContext, useState } from "react";
import Client from "../../client";
import db from "../../db";
import { LoggedInContext } from "./LoggedInContext";

function Form({tasks}) {
  const loggedIn = useContext(LoggedInContext);
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) {
      return;
    }
    addTask(description);
    setDescription("");
  }

  function addTask(description) {
    const maxPosition = tasks && tasks.map((t) => t.position).reduce((a, b) => a > b ? a : b, 0)
    const newPosition = (!maxPosition ? 1 : maxPosition + 1);
    const task = {id: crypto.randomUUID(), description: description, completed: false, position: newPosition, created_at: new Date, updated_at: new Date}
    db.tasks.add(task);
    if (loggedIn) {
      Client.addTask(task);
    }
  }


  return (
    <div className="px-4 pb-2 sm:px-6">
      <form onSubmit={handleSubmit}>
        <div className="mt-2 h-12 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              id="new-todo-input"
              className="block w-full rounded-none rounded-l-md border-0 py-3 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              name="text"
              autoComplete="off"
              placeholder="Todo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="relative -ml-px w-20 inline-flex justify-center items-center gap-x-1.5 rounded-r-md px-3 py-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 bg-white hover:bg-gray-50">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
