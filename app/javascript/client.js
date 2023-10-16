import axios from 'axios';

function fetchTasks() {
    return axios.get("/api/v1/tasks");
}

function fetchTask(id) {
    return axios.get(`/api/v1/tasks/${id}`);
}

function addTask(task) {
    return axios.post("/api/v1/tasks", task);
}

function bulkUpsertTasks(tasks) {
    return axios.put("/api/v1/tasks/bulk", tasks);
}

function updateTask(id, task) {
    return axios.put(`/api/v1/tasks/${id}`, task);
}


function deleteTask(id) {
    return axios.delete(`/api/v1/tasks/${id}`);
}

function getUser() {
    return axios.get(`/api/v1/user`);
}

function getEvents(since) {
    return axios.get(`/api/v1/events?since=${since}`)
}

const Client = { getEvents, getUser, fetchTasks, fetchTask, addTask, updateTask, bulkUpsertTasks, deleteTask };
export default Client;
