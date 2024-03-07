import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoComponent from './component/TodoComponent.js';
import HeaderComponent from './component/HeaderComponent.js';
import FooterComponent from './component/FooterComponent.js';
import AddTodo from './component/AddTodo.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './component/Home.js';
import { SignIn } from './component/SignIn.js';
import Signup from './component/Signup.js';
import {
  RecoilRoot
} from 'recoil';

function App() {
  return (
    <>
    <RecoilRoot>
    <div style={{ width: '100vw' }}>
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/LogIn' element={<SignIn />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/todo' element={<TodoComponent />}></Route>
          <Route path='/add-todo' element={<AddTodo />}></Route>
          <Route path='/update-todo/:todoId' element={<AddTodo />}></Route>
        </Routes>
      <FooterComponent />
      </BrowserRouter>
      <ToastContainer position='top-right' theme='colored' />
      </div>
      </RecoilRoot>
    </>
  )
}

export default App
