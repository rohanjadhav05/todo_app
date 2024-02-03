import axios from "axios";
const REST_API_BASE_URL = "http://localhost:7070/todo"

export const getallTodo = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createTodo = (todo) => {
    return axios.post(REST_API_BASE_URL, todo);
}

export const deleteTodoService = (id) => {
    return axios.delete(REST_API_BASE_URL+'/'+id);
}

export const updateToInProgress = (todo) => {
    return axios.put(REST_API_BASE_URL+'/inProgress',todo);
}

export const updateTodoService = (todo) =>{
    return axios.put(REST_API_BASE_URL,todo)
}