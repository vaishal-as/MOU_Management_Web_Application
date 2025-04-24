# 📝 MoU Management Web Application

A full-stack web application to **digitally manage Memorandums of Understanding (MoUs)** signed by institutions or companies. Built with **Vue.js**, **Node.js**, **Express.js**, and **MongoDB**, this application helps in storing, tracking, and analyzing MoUs efficiently.

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)

---

## 🧩 Overview

This application provides a centralized platform for institutions and companies to manage the **MoUs they sign with other parties** — including:

- Storage of MoU documents and metadata.
- Easy retrieval and filtering by parties, dates, status, and more.
- Secure access with user authentication.
- Admin control to manage and update MoU records.

---

## ✨ Features

- 🔒 Secure Login & Authentication (JWT + Google OAuth)
- 📂 Upload & Manage MoU Documents (PDF format)
- 🗂 Filter MoUs by date, category, status, or institute
- 📊 Dashboard with statistics & analytics
- 🔍 Search Functionality
- 👨‍💼 Admin Panel for Role Management
- 📁 MongoDB-based document storage
- 📧 The application now includes a feature that automatically sends email notifications to all admin users when an MoU expires.
---

## 🛠️ Tech Stack

### Frontend
- Vue.js (Composition API)
- Vue Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- Google OAuth Integration

---

## 🚀 Installation

### Prerequisites

- Node.js & npm
- MongoDB

### Backend Setup

```bash
cd backend
npm install
npm start
```

## 🔧 Frontend Setup

> This project uses Vue 3 and integrates Font Awesome, Axios, Google OAuth, Vue Router, and more.

### 📁 Step 1: Navigate to the frontend directory

```bash
cd frontend
npm install
npm run serve
```

## 📡 API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | `/api/auth/login`      | Authenticate user            |
| GET    | `/api/mous`            | Get all MoUs                 |
| POST   | `/api/mous`            | Create a new MoU             |
| PUT    | `/api/mous/:id`        | Update MoU by ID             |
| DELETE | `/api/mous/:id`        | Delete MoU by ID             |
| GET    | `/api/users`           | Admin: Get all users         |

> **Auth routes** include Google OAuth via `/api/auth/google`.

## 📁 Folder Structure

```bash
/frontend
  └── src/
      ├── components/
      ├── views/
      ├── router/
      └── App.vue

/backend
  ├── routes/
  └── server.js
```

## 📸 Screenshots

![Screenshot 2024-11-05 115505](https://github.com/user-attachments/assets/787fc2f6-c74a-4994-82dc-5c0ef024168c)

![Screenshot 2024-11-30 091445](https://github.com/user-attachments/assets/fbe292a9-c2c2-4c55-b547-6f91eb9ba3a7)

![Screenshot 2024-11-05 115536](https://github.com/user-attachments/assets/dc11b6fb-0c64-4671-833f-a737829085e7)

![Screenshot 2024-11-30 092127](https://github.com/user-attachments/assets/e30bcd93-8da9-4f3c-bec7-4363441d3771)

![Screenshot 2024-11-30 092140](https://github.com/user-attachments/assets/baca4806-2923-4f2a-85ea-1e335089e899)

![Screenshot 2024-11-30 091500](https://github.com/user-attachments/assets/08021eed-708a-4a30-8da2-919115c106a2)


