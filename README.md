# TODO List Application

This is a full-stack TODO list application built using Next.js for the frontend and FastAPI for the backend. The application allows users to add, update, delete, and filter tasks. The tasks are stored in a PostgreSQL database.

## Features

- **Add Task**: Users can add new tasks using an input field and a submit button.
- **Update Task**: Users can update the text and status of a task using a modal form.
- **Delete Task**: Users can delete tasks using a delete button with confirmation.
- **Filter Tasks**: Users can filter tasks based on their status (all, not completed, completed).
- **Complete Task**: Users can mark tasks as completed and revert them to not completed.
- **Responsive UI**: The application is responsive and styled with SASS.

## Technologies Used

### Frontend

- **Next.js**: A React framework used for building the user interface.
- **React DataTable Component**: A lightweight DataTable component for displaying tasks in a tabular format.
- **Axios**: A promise-based HTTP client for making API requests to the FastAPI backend.
- **SweetAlert2**: A library for displaying beautiful alerts and modals for user interactions.
- **React Icons**: A library for including icons in the UI (e.g., edit and delete icons).
- **React Modal**: A library for creating modal dialogs for editing tasks.
- **SASS**: A CSS preprocessor used for styling the application.

### Backend

- **FastAPI**: A modern, fast web framework for building APIs with Python 3.7+.
- **SQLAlchemy**: An ORM used for interacting with the PostgreSQL database.
- **PostgreSQL**: A powerful, open-source relational database for storing tasks.

