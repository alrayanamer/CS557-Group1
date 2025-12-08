# Library Management System


## Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.8+** - [Download here](https://www.python.org/downloads/)
- **Node.js 16+** and npm - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)

Verify installations:
```bash
python --version
node --version
npm --version
```

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/alrayanamer/CS557-Group1.git
cd CS557-Group1
```

### 2. Backend Setup (Django)

Navigate to the backend directory:
```bash
cd backend
```

Install required Python packages:
```bash
pip install django djangorestframework django-cors-headers
```

Run database migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Frontend Setup (React)

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install required npm packages:
```bash
npm install
```

This installs all dependencies in `package.json`

## Running the Application

You need to run both backend and frontend servers simultaneously.

### Use Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py runserver
```
Backend will run at: `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run at: `http://localhost:3000`

## 📁 Project Structure

```
CS557-Group1/
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── library_api/           # Main API app
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # API serializers
│   │   ├── views.py           # API endpoints
│   │   └── urls.py            # API routes
│   └── library_management/    # Django project settings
│       ├── settings.py        # Project configuration
│       └── urls.py            # Root URL configuration
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js             # Main app component
│       ├── App.css            # Global styles
│       ├── components/        # React components
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── AdminDashboard.js
│       │   ├── UserDashboard.js
│       │   ├── BookList.js
│       │   ├── BookForm.js
│       │   └── LoanHistory.js
│       └── services/          # API service functions
│           ├── api.js
│           ├── auth.js
│           ├── books.js
│           ├── loans.js
│           └── users.js
│
└── README.md
```