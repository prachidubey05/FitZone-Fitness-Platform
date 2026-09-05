# FitZone – Gym & Fitness Platform 🏋️

FitZone is a web-based Gym & Fitness Platform developed using the MERN stack. 
The platform provides users with an easy way to explore gym facilities, 
fitness services, trainers, and membership plans through a responsive web interface.

The project is being developed as a Mini Project by a team of five members.

---

## 📌 Project Overview

FitZone aims to provide a centralized platform where users can:

- Explore gym facilities and fitness services
- View trainer profiles and their specializations
- Explore available membership plans
- Register and log in to the platform
- Access membership-related information
- Connect with the gym through the contact section

The project follows a full-stack development approach using React.js, 
Node.js, Express.js, and MongoDB.

---

## 🎯 Objectives

The main objectives of FitZone are:

- To develop a responsive gym and fitness website
- To provide information about gym facilities and services
- To display trainer profiles and membership plans
- To implement user registration and login functionality
- To develop REST APIs using Express.js
- To store and manage application data using MongoDB
- To understand full-stack MERN development
- To practice Git and GitHub version control
- To improve teamwork and collaborative development skills

---

## ✨ Features

### 👤 User Features

- User Registration
- User Login
- User Dashboard
- Profile Information
- Membership Information

### 🏋️ Gym Features

- Gym Facilities
- Fitness Services
- Trainer Profiles
- Trainer Specializations
- Membership Plans
- Membership Pricing
- Contact/Enquiry

### 🔐 Authentication

- Secure user registration
- Password hashing
- User login
- JWT-based authentication
- Protected user routes

---

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Tools

- Visual Studio Code
- Git
- GitHub
- GitHub Desktop
- Postman
- MongoDB Compass

---

## 📂 Project Structure

```text
FitZone/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── TrainerCard/
│   │   │   └── MembershipCard/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Membership.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── trainerController.js
│   │   └── membershipController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Trainer.js
│   │   └── Membership.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── trainerRoutes.js
│   │   └── membershipRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
