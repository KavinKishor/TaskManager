import React, { useEffect, useState } from "react";
import Header from "../utils/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
 
  //

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  //filter

  const [statusFilter, setStatusfilter] = useState();
  const [filteredTask, setFilteredTask] = useState([]);
  //pagination
  const [currentPage, setCurrentpage] = useState(1);
  const [tasksPerpage] = useState(3);

  const indexOfLastTask = currentPage * tasksPerpage;
  const indexOfFirstTask = indexOfLastTask - tasksPerpage;
  const currentTask = filteredTask.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTask.length / tasksPerpage);

  //
  useEffect(() => {
    const fetchCategories = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
        },
      };
      await axios
        .get(`${process.env.REACT_APP_API_URL}/task/categories`, config)
        .then((res) => {
          setCategories(res.data.getall);
        });
    };

    const fetchTasks = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
        },
      };
      await axios
        .get(`${process.env.REACT_APP_API_URL}/task/tasks`, config)
        .then((res) => {
      
          const sortedTasks = res.data.getall.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setTasks(sortedTasks);
          setFilteredTask(sortedTasks);
        });
    };

    fetchTasks();
    fetchCategories();
  }, []);
 

  const handleEdit = (taskId) => {
    navigate(`/${taskId}`);
  };

  const handlestatuschage = async (taskId, newStatus) => {
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
      },
    };
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/task/tasks/${taskId}/status`,
          { status: newStatus },
          config
        )
        .then(
          (res) => (
            toast.success(res.data.message),
            setTasks((prevTask) =>
              prevTask.map((t) =>
                t._id === taskId ? { ...t, status: newStatus } : t
              )
            )
          )
        );
    } catch (error) {
      console.log(error);
      
    }
  };

  const handledeletetask = async (id) => {

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
      },
    };
    try {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/task/tasks/${id}`, config)
        .then(
          (res) => (
            setTasks((prevTask) => prevTask.filter((task) => task._id !== id)),
            toast.success("Task deleted")
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  //delete category

  const handledeletecategory = async (catId) => {
    const confirmDel = window.confirm(
      "Are you sure to delete this category with associated tasks ? "
    );
    if (!confirmDel) return;
    
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Auth-token")}`,
      },
    };

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/task/categories/${catId}`,
        config
      );
      const remainingTask = tasks.filter(
        (task) => task.category?._id !== catId
      );

      setTasks(remainingTask);
      setFilteredTask(remainingTask);
      setCategories((prvCat) => prvCat.filter((cat) => cat._id !== catId));
      toast.success("category and associated tasks are deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  //filter

  useEffect(() => {
    let filtered = tasks;

    if (category) {
      filtered = filtered.filter((task) => task.category?._id === category);
    }
    if (statusFilter) {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    setFilteredTask(filtered);
  }, [category, statusFilter, tasks]);

 
  return (
    <>
      <div>
        <Header />
      </div>
      {/* side section */}
      <main className="flex items-center ">
        <div className="p-2 m-1 w-[200px] h-[600px] rounded border-4">
          <div className="h-[550px]">
            <p className="text-2xl text-gray-600 subpixel-antialiased">
              Filter
            </p>
            <hr />
            <div className="mt-2 ">Categories</div>
            {/* map all categories */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-teal-500 text-white rounded mt-2 border-0"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <hr className="mt-2" />
            <div className="h-[200px]">
              <p>status</p>
              {/* list of status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusfilter(e.target.value)}
                className="bg-teal-500 text-white rounded mt-2 border-0"
              >
                <option value="">All status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <hr />
            {/* delete */}
            <div className="mt-4">
              <p className="text-2xl text-gray-600 subpixel-antialiased">
                Delete category
              </p>
              <hr className="mt-1" />
              {categories.map((c) => (
                <div key={c._id} className="flex justify-between items-center">
                  <span>{c.name}</span>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handledeletecategory(c._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* task section */}
        <div className="p-4 m-1 w-full h-[600px]  rounded border-4 ">
          <div className="mb-5 mt-1">
            <Link
              to="/newtask"
              className="bg-teal-500 text-white p-3 rounded mb-2"
            >
              Create new Task
            </Link>
          </div>

          <hr className="m-1" />

          {currentTask.map((t) => (
            <div key={t._id} className="rounded m-1 ">
              <div className=" p-1 flex justify-between">
                <p>Task Title: {t.title}</p>
                <p>Category: {t.category ? t.category.name : "No Category"}</p>
                <p>
                  Status:
                  <select
                    value={t.status}
                    onChange={(e) => handlestatuschage(t._id, e.target.value)}
                    className={`ml-3 p-1 w-32 rounded text-white ${
                      t.status === "pending"
                        ? "bg-yellow-500"
                        : t.status === "in-progress"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  >
                    <option value="">Select Status</option>
                    <option value="pending" className="bg-gray-500">
                      Pending
                    </option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </p>
                <div>
                  <button
                    className="p-1 mr-1  text-blue-600 rounded  "
                    onClick={() => handleEdit(t._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-1 bg-white text-red-600 rounded "
                    onClick={() => handledeletetask(t._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className=" p-1 ">
                <p>Description: {t.description}</p>
                <p>Due Date: {t.duedate}</p>
              </div>
              <hr className="border-t-4 border-gray my-4 " />
            </div>
          ))}
          <hr className="border-2 m-1" />
          {/* pagination */}
          <div className="mt-9">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentpage(i + 1)}
                className={` p-2 rounded border-2 m-1 text-gary border-teal-300 ${
                  currentPage === i + 1 ? "bg-blue-300" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      {/* footer */}
      <div className="flex justify-center">
        <p>&copy;2024 Task App</p>
      </div>
    </>
  );
};

export default Dashboard;
