import {useState, FormEvent} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { createTodo } from '../service/TodoService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { TodoDto } from './TodoComponent';

export default function AddTodo() {

  const [todoDesc, setTodoDesc] = useState('');
  const navigator = useNavigate(); 

  function saveTodo(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const todo : TodoDto  = { todoId : 0, todoDesc : todoDesc, todoCreate : "", todoDone : "", todoStatus : "", userId : localStorage['userId']};
    console.log('Todo : ', todo);
    if(todoDesc.length == 0){
      toast.error("Please add the Description");
    }
    else
    {
      createTodo(todo).then((response) => {
        console.log(response.data);
        toast.success("Todo Added Successfully")
        navigator("/todo");
      }).catch(err => {
        toast.error("Failed")
        console.error(err);
      })
    }  
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '87vh' }}>    
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => saveTodo(e)}>
        Todo Description 
          <TextField 
              id="outlined-basic" 
              label="Enter desc" 
              variant="outlined" 
              type='text' 
              value={todoDesc}
              onChange={(e)=>{
                setTodoDesc(e.target.value);
              }}
              />
          <Button variant="contained" type='submit'>Add</Button>
      </Box>
    </div>
  );
}