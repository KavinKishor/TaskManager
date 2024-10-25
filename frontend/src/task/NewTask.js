import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/LoadingSpinnerjs";

const NewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [duedate, setDueDate] = useState();
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState();
  const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);
  //category
  const [newCategory,setNewCategory] =useState()
  const [showNewCategoryInput,setShowNewCategoryInput] = useState(false)


  const navigate = useNavigate();

  useEffect(() => {
    const fetchtaskwithcategory = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
        },
      };
      try {
        // find categories
        await axios
          .get(`${process.env.REACT_APP_API_URL}/task/categories`, config)
          .then((res) => setCategories(res.data.getall));
      } catch (error) {
        console.log(error);
      }
    };
    fetchtaskwithcategory();
  }, []);

  //task
  const handlnewtask = async (e) => {
    e.preventDefault()
    // console.log(e);
    setLoading(true)
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
      },
    };
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/task/tasks`,
          { title, description, status, category, duedate },
          config
        )
        .then((res) => (toast.success(res.data.message),setLoading(false),navigate("/tasks")))
        .catch((err) => toast.error(err.message));
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false)
    }
  };
  //category
  const handlenewcategory = async () => {
    setLoading(true)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
      },
    };
    try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/task/categories`,
      { name: newCategory },
      config
    );
      const createdcategory = response.data.category
     setCategories([...categories,createdcategory])
     setCategory(createdcategory._id)
     setShowNewCategoryInput(false)
     setLoading(false)
     toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
if(loading){
  return <LoadingSpinner/>
}
  return (
    <>
      <h3 className="text-center mt-5 text-xl font-semibold text-blue-800">
        Create your new task
      </h3>
      <div className="flex justify-center items-center mt-[100px] rounded-l ">
        <form
          className="flex flex-col w-[600px] gap-4"
          onSubmit={(e) => handlnewtask(e)}
        >
          <input
            type="text"
            placeholder="Task Title"
            className="rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="rounded"
            value={status}
            multiple={false}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="pending" key="pending">
              Pending
            </option>
            <option value="in-progress" key="in-progress">
              In-Progress
            </option>
            <option value="completed" key="completed">
              Completed
            </option>
          </select>
          <textarea
            type="text"
            placeholder="Task description"
            className="rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="rounded"
            value={category}
            onChange={(e) => {
              if (e.target.value === "new-category") {
                setShowNewCategoryInput(true);
              } else {
                setCategory(e.target.value);
                setShowNewCategoryInput(false);
              }
            }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
            <option value="new-category">Add new category</option>
          </select>
          {showNewCategoryInput && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter new category"
                className="rounded w-full"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                className="rounded bg-green-400 text-white p-2 m-1"
                type="button"
                onClick={handlenewcategory}
              >
                Add
              </button>
            </div>
          )}

          <input
            type="date"
            placeholder="due date of the task"
            className="rounded"
            value={duedate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="rounded bg-blue-500 text-white p-2" type="submit">
            Create
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

export default NewTask;
