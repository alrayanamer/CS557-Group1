# CS557-Group1

Clone the Repository
----------------------------------
git clone https://github.com/<your-username>/library-management-system.git
cd library-management-system

Open in VS Code
----------------------------------
- Open Visual Studio Code
- Go to File → Open Folder...
- Select the project root folder (library-management-system/)

 Backend Setup (Django)
----------------------------------

Install Backend Dependencies
----------------------------------
pip install django djangorestframework django-cors-headers

Run Initial Migrations
----------------------------------
python manage.py makemigrations
python manage.py migrate

This creates your default SQLite database (db.sqlite3).

(You can add MySQL later with:)
pip install mysqlclient

Run the Django Server
----------------------------------
python manage.py runserver

Visit the backend API in your browser:
http://127.0.0.1:8000/api/

Frontend Setup (React)
----------------------------------

Install Node.js (if not installed)
----------------------------------
Download from: https://nodejs.org/
Then verify:
node -v
npm -v

Install React Dependencies
----------------------------------
cd ../frontend
npm install

Run the React App
----------------------------------
npm start

The frontend runs on:
http://localhost:3000

----------------------------------
Make sure:
- Django runs on port 8000
- React runs on port 3000
- CORS is enabled in settings.py:
  CORS_ALLOWED_ORIGINS = [
      "http://localhost:3000",
  ]
