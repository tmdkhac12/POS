# Fast Food POS 🍔🍜☕
An effective **Point of Sale (POS)** system tailored for restaurants, fast food shops, and cafes. This system allows **customers to place orders** directly from tablets, while **staff and kitchen** teams manage and track order statuses on their own devices.

## 📚 Table of Contents

- [🌟 Features](#-features)
- [📸 Demo & Screenshots](#-demo--screenshots)
- [👩‍💼 User Roles & Demo Accounts](#-user-roles--demo-accounts)
- [🛠 Technologies Used](#-technologies-used)
- [📁 Project Structure](#-project-structure)
- [🔧 Installation Guide](#-installation-guide)

## 🌟 Features

- 🖥️ Customer interface to place orders easily
- 👩‍💼 Staff interface to monitor completed dishes for serving
- 🧑‍🍳 Kitchen interface to manage and complete dishes
- 🧑‍💼 Admin interface to manage menu, bills, user accounts, ...
- 🧾 Real-time order updates
- 🔒 Role-based interface access using login authentication

## 📸 Demo & Screenshots

For a complete demo and project description, check out the LinkedIn post here:
🔗 [POS Introduction]()

## 👩‍💼 User Roles & Demo Accounts
Here are the pre-created accounts available in the system:

| Username  | Password   | Role       |
|-----------|------------|------------|
| `admin`   | `admin123` | Admin      |
| `nhanvien`| `admin123` | Staff      |
| `bep`     | `admin123` | Kitchen    |

> You can use these accounts to test different interfaces and functionalities.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS, Bootstrap 5.  
- **Backend**: Node.js, Express.js.  
- **Application Type**: Web Application.

## Project Structure 
```
POS/
├── backend/
│   ├── configs/        # Configuration files for server and modules
│   ├── controllers/    # Logic for handling API requests
│   ├── database/       # File to create database
│   ├── middleware/     # Custom middleware for authentication, logging etc.
│   ├── models/         # Database models 
│   ├── routes/         # API, SSR route definitions
│   ├── util/           # Utility/helper functions
│   ├── .env            # Environment variable configuration file
│   ├── server.js       # Entry point of the backend server
├── frontend/
│   ├── admin/          # Admin interface
│   ├── bep/            # Kitchen interface
│   ├── images/         # Static image assets
│   ├── khachhang/      # Customer interface
│   ├── login/          # Login page interface
│   ├── nhanvien/       # Staff interface
├── .env.example        # Example environment configuration file
├── .gitignore          
├── package-lock.json   
├── package.json        
├── README.md           

```  

## 🔧 Installation Guide For Testing
### 1. Install Docker
If Docker is already installed, you can skip this step. Otherwise, please install it by following the guide at [Install Docker](https://docs.docker.com/desktop/setup/install/windows-install/)

### 2. Clone the Project and Run the Container
Clone the repository to your local machine:
```
# Clone the project
git clone https://github.com/tmdkhac12/POS.git

# Navigate into the project directory
cd POS

# Build the application
docker compose up -d --build
```

### 3. Run the application
Open your browser and access:
`http://localhost:3005/<frontend_module_name>`<br><br>
Example (based on default setup):
- `http://localhost:3005/khachhang/table/<table_id>` – Customer interface
- `http://localhost:3005/login` – Login interface (use the username and password at [👩‍💼 User Roles & Demo Accounts](#-user-roles--demo-accounts) to access the interface you want)

## 🔧 Installation Guide For Developing

### 1. Install Node.js
If Node.js is already installed, you can skip this step. Otherwise, please install it by following the guide at https://nodejs.org/en. 

### 2. Clone the Project
Clone the repository to your local machine:
```
# Clone the project
git clone https://github.com/tmdkhac12/POS.git

# Navigate into the project directory
cd POS

# Install dependencies
npm install
```

### 3. Create Database & Configure the .env File
Create your database based on the file `./backend/database/init.sql` (using MariaDB)

This project uses environment variables for sensitive information, so the .env file is not included. Please create and configure it as follows:

- Create the .env file: `cp .env.example ./backend/.env`
- Open .env and set the appropriate values:
```
PORT=your_port
...
SESSION_SECRET=your_session_secret
```

### 4. Start the Backend Server
To run the backend server:
```
npm run dev 
```

### 5. Run the application
Once the server is up and running, open your browser and access:
`http://localhost:<port>/<frontend_module_name>`<br><br>
Example (based on default setup):
- `http://localhost:3000/khachhang/table/<table_id>` – Customer interface
- `http://localhost:3000/login` – Login interface (use the username and password at [👩‍💼 User Roles & Demo Accounts](#-user-roles--demo-accounts) to access the interface you want)