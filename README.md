## Task Management API Overview
This project is a Task Management API built with Node.js and Express, designed to handle the full lifecycle of a To-Do list. It utilizes a MySQL relational database for data persistence, specifically leveraging the mysql2/promise driver to ensure high performance and full control over database interactions through secure, raw SQL queries. Environment configuration is managed securely using the dotenv package.

## Key Features
- Full CRUD Lifecycle: Create, read, update, and permanently delete tasks.

- Dynamic Updates: Users can edit specific fields—such as a task's title, description, category, or due date—without accidentally overwriting existing data.

- Built-in Validation: Prevents empty task titles and blocks redundant status updates when marking a task as complete.

## Local Setup Instructions
- Install Dependencies: Clone the repository and run npm install.

- Database Setup: Create a local MySQL database named todo_db.

- Environment Variables: Configure your database credentials and port number inside a .env file in the root directory.

- Initialize Schema: Run the required SQL command to create the tasks table (including columns for ID, title, description, completion status, category, due date, and creation timestamp).

- Start the Server: Launch the application.

## API Endpoints
The application exposes several intuitive endpoints for interacting with the data:

- GET /tasks/ — Retrieves all current tasks sorted by their creation date.

- POST /tasks/addTask — Adds a new entry via a JSON payload.

- PATCH /tasks/completeTask/:id — Marks a specific task as finished.

- PUT /tasks/updateTask/:id — Modifies specific task details dynamically.

- DELETE /tasks/deleteTask/:id — Permanently removes a task from the database.

## Architecture & Error Handling
- Raw SQL vs. ORM: A deliberate architectural choice was made to use raw SQL with prepared statements rather than an ORM like Sequelize. This approach minimizes overhead, neutralizes SQL injection threats, and demonstrates secure, dynamic query building.

- Graceful Error Handling: The application features comprehensive error management. All asynchronous database calls are wrapped in try-catch blocks to return appropriate HTTP status codes, such as 400 for bad user input, 404 for missing records, and 500 for unexpected server issues.
