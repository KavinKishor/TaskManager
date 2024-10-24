import './App.css';
import { Route, Routes } from 'react-router-dom'
import Register from './Auth/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Signin from './Auth/Signin';
import Dashboard from './task/Dashboard';
import NewTask from './task/NewTask';
import EditTask from './task/EditTask';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        theme="colored"
      />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Signin />} />
        <Route path="/tasks" element={<Dashboard />} />
        <Route path="/newtask" element={<NewTask />} />
        <Route path="/:id" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
