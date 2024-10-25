import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify'



const EditTask = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [category, setCategory] = useState();
  const [status, setStatus] = useState();
   const [categories, setCategories] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchtaskwithcategory = async()=>{
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
        },
      };
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/task/tasks/${id}`, config)
          .then(
            (res) => (
              // console.log(res.data),
              setTitle(res.data.title),
              setCategory(res.data.category._id),
              setDescription(res.data.description),
              setStatus(res.data.status),
              setDueDate(res.data.dueDate)
            )
          );
// find categories
        await axios
          .get(`${process.env.REACT_APP_API_URL}/task/categories`, config)
          .then((res) => setCategories(res.data.getall));
        
      } catch (error) {
        console.log(error);
        
      }
     
    }
    fetchtaskwithcategory()
  }, [id]);

  const handleUpdate = async(e) => {
    e.preventDefault();
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
      },
    };

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/task/tasks/${id}`,
        { title, description, status, dueDate, category },
        config
      )
      .then(
        (res) => (
          setTasks(res.data),
          toast.success(res.data.message),
          
          navigate("/tasks")
        )
      );
  };

  
  return (
    <>
      <h3 className="text-center mt-5 text-xl font-semibold text-blue-800">
        Edit task
      </h3>
      <div className="flex justify-center items-center mt-[25px] rounded-l ">
        <form action="" className="flex flex-col w-[600px] gap-4">
          <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="Task Title"
            className="rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">Status</label>
          <select className="rounded" value={status || 'pending'} onChange={(e)=>setStatus(e.target.value)}>
            <option value='pending' key='pending'>Pending</option>
            <option value="in-progress" key="in-progress">In-Progress</option>
            <option value="completed" key="completed">Completed</option>
          </select>
          <label htmlFor="">Description</label>
          <textarea
            type="text"
            placeholder="Task description"
            className="rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="">Category</label>
          <select
            className="rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label htmlFor="">Due Date</label>
          <input
            type="date"
            placeholder="due date of the task"
            className="rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            className="rounded bg-blue-500 text-white p-2"
            onClick={handleUpdate}
          >
            update
          </button>
          <Link
            to="/tasks"
            className="rounded text-center bg-red-500 text-white p-2"
          >
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditTask;
