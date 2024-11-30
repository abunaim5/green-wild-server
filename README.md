# Green Wild Server

This is the backend application for the MERN stack project. It is built using **Node.js** with **Express.js** and connected to a **MongoDB** database. The backend provides RESTful APIs to power the frontend application.

---

## Key Features

- **Category Management**: 
  - Add, Get, and fetch categories.
- **Animal Management**: 
  - Add, Get, and fetch animal details with category linkage.
- **Sorting and Filtering**: 
  - Backend support for filtering animals by category and sorting them alphabetically.
- **Database Integration**: 
  - MongoDB is used to store and retrieve data.
- **Secure Environment Variables**: 
  - Environment variables used for database connection and configurations.
- **Error Handling**: 
  - Middleware implemented for clean and structured error handling.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Language**: JavaScript
- **Libraries/Tools**:
  - dotenv: For environment variable management.
  - Cors: To handle cross-origin requests.

---

## Installation and Setup

Follow these steps to set up the backend locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-backend-repository.git

2. Navigate to the project directory:
cd your-backend-repository

3. Install dependencies:
npm install

4. Create a .env file in the root directory and add the necessary environment variables:
MONGO_URI=your_mongodb_connection_string
PORT=your_preferred_port

5. Start the development server:
nodemon index.js
