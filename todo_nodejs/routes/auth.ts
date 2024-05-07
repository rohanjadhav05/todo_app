import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, SECRET } from "../middleware";
import { User } from "../db";
import { signupInput } from "@100xdevs/common"
import prisma from '../prismaClient';

const router = express.Router();

router.post('/signup', async (req, res) => {
    let parsedInput = signupInput.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error"
      });
    }
    const username = parsedInput.data.username 
    const password = parsedInput.data.password 
    
    const user = await prisma.todo_user.findFirst({
          where : {
            username : username
          }
    })

    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = await prisma.todo_user.create({
        data : {
          username : username,
          password : password
        }
      })
      console.log("New user created:", newUser);
      const token = jwt.sign({ id: newUser }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
});
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.todo_user.findMany({
      where : {
        username : username,
        password : password
      }
    })
    console.log(user);
    if (user) {
      const token = jwt.sign({ id: user[0].id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId: number | undefined = req.headers?.["userId"] ? parseInt(req.headers["userId"] as string, 10) : undefined;
      const user = await prisma.todo_user.findFirst({
        where : {
          id : userId
        }
      })
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

export default router;
