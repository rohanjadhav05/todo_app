import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
const router = express.Router();
import prisma from '../prismaClient';
import { number } from 'zod';

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt, (req, res) => {
  const title : string = req.body.title;
  const description : string = req.body.description;
  const done = false;
  const userIdHeaderValue = req.headers["userId"];
  const userId: number = parseInt(userIdHeaderValue as string, 10);

  prisma.todo_schema.create({
    data : {
      title : title,
      description : description,
      done : false,
      user_id : userId,
    },
  }).then((newTodo) => {
    console.log("new todo created : "+newTodo);
    res.status(201).json(newTodo);
  }).catch((err) => {
    res.status(500).json({error : 'Failed to create a new todo'})
  })
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userIdHeaderValue = req.headers["userId"];
  const userId: number = parseInt(userIdHeaderValue as string, 10);
  prisma.todo_schema.findMany({
    where : {
      user_id : userId
    }
  }).then((todo) => {
    res.json(todo);
  }).catch((err) => {
    res.status(500).json({error : 'Failed to Create Todo'})
  })
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const todoIdParam = req.params.todoId;
  const todoId: number = Number(todoIdParam);
  const userIdHeaderValue = req.headers["userId"];
  const userId: number = parseInt(userIdHeaderValue as string, 10);
  
  prisma.todo_schema.update({
    where : {
      todo_id : todoId,
    },
    data : {
      done : true
    }
  }).then((updateTodo) => {
    if(!updateTodo){
      return res.status(404).json({error : 'Todo not found'})
    }
    res.json(updateTodo)
  })
  .catch((err) => {
    res.status(500).json({error : 'Failed to Update Todo'})
  })
});

export default router;
