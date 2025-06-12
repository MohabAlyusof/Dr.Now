# Dr.Now - MERN Stack Healthcare Platform

## Overview

Dr.Now is a comprehensive healthcare platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It facilitates seamless interaction between patients, doctors, and administrators, offering features such as appointment scheduling, video consultations (powered by Agora), secure payments (Stripe), and robust user management. This project aims to provide an efficient and user-friendly experience for managing healthcare services.

## Features

- **User Authentication**: Secure login and registration for patients, doctors, and administrators.
- **Appointment Management**: Patients can book appointments with doctors, and doctors can manage their schedules.
- **Video Consultation**: Integrated Agora SDK for real-time video calls between patients and doctors.
- **Payment Gateway Integration**: Supports Stripe for secure online transactions.
- **Cloudinary Integration**: For efficient image and file uploads.
- **Admin Panel**: A dedicated dashboard for administrators to manage users, doctors, and system settings.
- **Responsive Design**: User-friendly interface across various devices.

## Live Demo

[https://dr-now-backend.onrender.com]
[https://dr-now-frontend.onrender.com]

## Technologies Used

### Frontend (Admin Panel)

- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Framer Motion**: A production-ready motion library for React.
- **React Router DOM**: Declarative routing for React.
- **React Icons**: Popular icons as React components.
- **React Toastify**: For easy notifications.
- **Agora RTC SDK NG**: For real-time video communication.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcrypt**: For hashing passwords.
- **jsonwebtoken**: For implementing JWT-based authentication.
- **dotenv**: To load environment variables from a `.env` file.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **multer**: A middleware for handling `multipart/form-data`, primarily used for uploading files.
- **Cloudinary**: Cloud-based image and video management service.
- **Stripe**: Payment processing platform.
- **validator**: For string validation and sanitization.
- **Agora Access Token**: For generating Agora tokens.

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- MongoDB instance (local or cloud-based)
- Cloudinary Account
- Stripe Account
- Agora.io Account

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Dr.Now/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Create a `.env` file** in the `backend` directory and add your environment variables:
    ```
    PORT=7777
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    AGORA_APP_ID=your_agora_app_id
    AGORA_APP_CERTIFICATE=your_agora_app_certificate
    ```
4.  **Run the backend server:**
    ```bash
    npm start
    # or npm run server (for development with nodemon)
    ```

### Frontend Setup (Admin Panel)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../admin
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```

## Project Structure

```
Dr.Now/
├── admin/                # Frontend (React.js Admin Panel)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/              # Backend (Node.js/Express.js API)
    ├── config/           # Database and Cloudinary configurations
    ├── controllers/      # Business logic for API endpoints
    ├── models/           # Mongoose schemas
    ├── middleware/       # Express middleware
    ├── routes/           # API routes
    ├── node_modules/
    ├── package.json
    └── server.js         # Main backend server file
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.




