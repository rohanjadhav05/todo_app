import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/todo"
import { TodoDto, UserDto } from "../component/TodoComponent";

export const getallTodo = (userId : number) => {
     return axios.get(REST_API_BASE_URL+'/'+userId);
}

export const createUser = (userDto : UserDto) => {
    return axios.post("http://localhost:8080/user/singUp", userDto);
}

export const createTodo = (todo : TodoDto) => {
    return axios.post(REST_API_BASE_URL, todo);
}

export const deleteTodoService = (id : number) => {
    return axios.delete(REST_API_BASE_URL+'/'+id);
}

export const updateToInProgress = (todo : TodoDto) => {
    return axios.put(REST_API_BASE_URL+'/inProgress',todo);
}

export const updateTodoService = (todo : TodoDto) =>{
    return axios.put(REST_API_BASE_URL,todo)
}