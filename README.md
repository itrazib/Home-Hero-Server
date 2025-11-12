🖥️ Home Hero Server

Live API Base URL: https://your-server-url.onrender.com/
Client App: https://hero-home.netlify.app/

🧾 Project Overview

এই Server টি Home Hero অ্যাপের backend অংশ, যেখানে Express এবং MongoDB ব্যবহার করা হয়েছে।
এখানে সার্ভিস, ইউজার বুকিং, এবং ইউজারের নিজস্ব সার্ভিস সংরক্ষণ ও পরিচালনা করা হয়।

🚀 Key Features

✅ RESTful API using Express.js
✅ CRUD Operations (Create, Read, Update, Delete)
✅ MongoDB Database (using Mongoose / MongoClient)
✅ CORS enabled for frontend connection
✅ Environment variable support using .env
✅ Secure API endpoints
✅ Deployed on Render

🛠️ Technologies Used
Category	Tools / Libraries
Server Framework	Express.js
Database	MongoDB
Security	dotenv, cors
Deployment	Render
HTTP Client (Testing)	Postman
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/home-hero-server.git

2️⃣ Move to the project directory
cd home-hero-server

3️⃣ Install Dependencies
npm install

4️⃣ Create a .env file in root folder

Add your environment variables like below 👇

PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
DB_URI=mongodb+srv://your_user:your_pass@cluster0.mongodb.net/

5️⃣ Run the Server Locally
npm run start


Or, for development with auto restart:

npm run dev


Server will start on:
👉 http://localhost:5000/

📡 API Endpoints
Method	Endpoint	Description
GET	/	Test route
GET	/services	Get all services
GET	/services/:id	Get single service details
POST	/services	Add new service
DELETE	/services/:id	Delete a service
GET	/my-bookings?email=user@gmail.com	Get bookings by user email
POST	/bookings	Create a booking
DELETE	/bookings/:id	Cancel a booking
GET	/top-rated	Get top rated services
🧪 Example Test (Postman)

GET Request:

GET http://localhost:5000/services


Response:

[
  {
    "_id": "654a1f8a1c4d2b0012345683",
    "name": "Garden Landscaping",
    "category": "Outdoor",
    "price": 150,
    "description": "Transform your garden with professional landscaping.",
    "rating": 4.8
  }
]

🧑‍💻 Developer Info

👨‍💻 Developer: Razib Das
📍 Bangladesh
📬 Email: your.email@example.com

🌐 Client App: https://hero-home.netlify.app/
