# Task Manager Application

## 📋 Overview

This is a Task Manager application built using the MERN stack (MongoDB, Express.js, React, Node.js). Users can create a new account and log in. Upon logging in, a JWT token is generated based on the user's credentials, ensuring that all upcoming activities are authorized by this token. This prevents other users from interacting with the current user session.

The application features a dashboard where users can:

- Create new tasks
- View tasks
- Edit tasks
- Delete tasks
- create new category

The dashboard includes pagination for task management, and on the left side of the page, users have filtering options to filter tasks by category and status. Below the task list, users can find an option to delete categories; when a category is deleted, all associated tasks are also removed. 

At the top right corner of the dashboard, users can access their profile, which includes a logout button to end their session securely.

## 🚀 Features

- User Authentication
- Task Management
- Categories
- Modern Design

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Tailwind CSS
  
## Deployed on Render

## 🌐 Live Demo

[Click here to view the live application](https://taskmanager-1-526y.onrender.com) 

## 🛠 Installation

To get started, clone the repository:
git clone https://github.com/KavinKishor/TaskManager.git  

Backend Setup

Navigate to the backend directory:

--cd TaskManager/server

Install dependencies:
--npm install

Create a .env file and add your MongoDB URI:
--.env
MONGO_URI = your_mongodb_uri 
TOKEN = your_jwt_secret   
PORT = your_port_number


Start the backend server:
--npm start


Frontend Setup
Navigate to the frontend directory:

--cd ../frontend

Install dependencies:
--npm install

Start the frontend server:
--npm start

🤝 Contributing
Contributions are welcome! Please create a pull request or open an issue for any suggestions or improvements.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

👤 Author
E. Kavinkumar
LinkedIn Profile (linkedin.com/in/kavinkumarkl05)
