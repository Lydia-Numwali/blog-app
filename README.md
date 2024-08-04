# Blogging Application

This is a blogging application built with React, TypeScript, and Node.js. The application allows users to create, read, update, and delete blog posts and comments. Users can also log in and log out.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features
- User authentication (login and logout)
- Create, read, update, and delete blog posts
- Comment on posts
- View other posts in the same category
- Responsive design

## Technologies
- React
- TypeScript
- Node.js
- Express
- Axios
- React Router
- React Toastify
- Date-fns
- Tailwind CSS (or your chosen CSS framework)

## Setup

### Prerequisites
- Node.js (>=14.x)
- npm or yarn

### Backend Setup
1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/blogging-app.git
    cd blogging-app
    ```

2. Navigate to the backend directory
    ```bash
    cd server
    ```

3. Install the dependencies
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the backend directory and add your environment variables
    ```env
    PORT=5000
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    ```
    Also setup your database for my case I used postgresql and create users,posts,comment tables in your database

5. Start the backend server
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory
    ```bash
    cd ../frontend
    ```

2. Install the dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the frontend directory and add your environment variables
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. Start the frontend development server
    ```bash
    npm start
    ```

## Running the Application

1. Ensure the backend server is running
    ```bash
    cd server
    npm start
    ```

2. In a new terminal, ensure the frontend development server is running
    ```bash
    cd client
    npm start
    ```

3. Open your browser and navigate to `http://localhost:5000` to see the application in action.

## Folder Structure

blogging-app/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ ├── .env
│ ├── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.tsx
│ │ ├── index.tsx
│ ├── public/
│ ├── .env
│ ├── package.json