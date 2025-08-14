# 📂 Portfolio Builder App

The **Portfolio Builder App** is a full-stack web application designed to help users—particularly students, freelancers, and job seekers—create and manage professional portfolios with ease. Users can securely register, add personal and project details, and choose from pre-designed responsive templates to generate a live portfolio website.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure **JWT-based authentication** for users and admins.
- Passwords encrypted using **bcrypt**.
- Role-based access control and protected API routes.

### 🖊 Portfolio Management
- Add **personal details**, education, experience, and skills.
- Upload and manage **project details** with images.
- Live preview of portfolio before publishing.
- **Search and filter** functionality for projects.

### 🖼 Image Handling
- Upload profile and project images.
- File storage handled via backend using **Multer**.

### 📱 Responsive Design
- Mobile-first UI.
- Optimized for desktop, tablet, and mobile devices.

### 📊 Admin Dashboard
- Manage all users and their portfolios.
- Monitor platform activities.

---

## 🛠 Tech Stack

### **Frontend**
- **React.js** with **TypeScript**
- **TanStack Router** for routing
- **Context API + React Hooks** for state management
- **Tailwind CSS** for styling
- **Lucide React** for icons

### **Backend**
- **Node.js** with **Express.js** and **TypeScript**
- **MongoDB** with **Mongoose**
- **Multer** for file uploads
- **bcrypt.js** for password hashing
- **jsonwebtoken** for JWT authentication

---

## 📂 Folder Structure

portfolio-builder-app/
│
├── backend/
│ ├── src/
│ │ ├── config/ # Database and server configuration
│ │ ├── controllers/ # Request handlers
│ │ ├── middleware/ # Authentication and error handling
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # API endpoints
│ │ └── index.ts # App entry point
│
├── frontend/
│ ├── src/
│ │ ├── assets/ # Static assets
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Context API providers
│ │ ├── hooks/ # Custom hooks
│ │ ├── pages/ # Application pages
│ │ └── main.tsx # Entry point

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/portfolio-builder-app.git
2️⃣ Backend Setup
cd server
npm install
Create a .env file inside the backend directory:
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
UPLOAD_PATH=uploads/
Run the backend:
npm run dev
3️⃣ Frontend Setup
cd client
npm install
Create a .env file inside the frontend directory:
VITE_API_URL=http://localhost:5000/api
Run the frontend:
npm run dev

Deployment
You can deploy this app on:
Frontend → Vercel / Netlify
Backend → Render / Railway / Heroku
Database → MongoDB Atlas

📜 License
This project is licensed under the MIT License. You are free to use, modify, and distribute this project as long as the original license is included.
