# User Management System

A full-stack User Management System built using React, Redux Toolkit, Node.js, Express, and MongoDB. The application provides secure user authentication, profile management, state management with Redux, and file upload functionality.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Password Hashing using Bcrypt
- Protected Routes

### User Management
- Create Users
- View User Details
- Update User Information
- Delete Users

### State Management
- Redux Toolkit
- Centralized Global State
- Redux Actions & Reducers

### Additional Features
- Image/File Upload using Multer
- API Integration using Axios
- Real-time Notifications with React Hot Toast
- Responsive UI
- React Router Navigation

---

## 🛠 Tech Stack

### Frontend
- React 19
- Redux Toolkit
- React Redux
- React Router DOM
- Axios
- React Hot Toast
- Lucide React
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- Bcrypt.js

### File Handling
- Multer

---

## 📂 Project Structure

```bash
REACT_user_management/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/mhd-Althaf/REACT_user_management.git
```

### Navigate to Project

```bash
cd REACT_user_management
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Runs on:

```bash
http://localhost:5173
```

---

## Backend Setup

```bash
cd server

npm install

npm run server
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## API Communication

The frontend communicates with the backend using Axios to perform:

- Authentication Requests
- User CRUD Operations
- File Upload Requests

---

## Future Enhancements

- Role-Based Access Control
- Search & Filter Users
- Pagination
- Email Verification
- Forgot Password Feature
- Refresh Token Authentication
- Admin Dashboard

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Registration Page
- User Dashboard
- User Profile Page

---

## 👨‍💻 Author

**Muhammed Althaf P C**

GitHub:
:contentReference[oaicite:0]{index=0}

---

## ⭐ Support

If you found this project useful, please consider giving it a star on GitHub.
