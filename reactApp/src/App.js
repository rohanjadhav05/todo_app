import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoComponent from './component/TodoComponent.js';
import HeaderComponent from './component/HeaderComponent.js';
import FooterComponent from './component/FooterComponent.js';
import AddTodo from './component/AddTodo.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' element={<TodoComponent />}></Route>
          <Route path='/add-todo' element={<AddTodo />}></Route>
          <Route path='/update-todo/:todoId' element={<AddTodo />}></Route>
        </Routes>
      <FooterComponent />
      </BrowserRouter>
      <ToastContainer position='top-right' theme='colored' />
    </>
  )
}

export default App;
