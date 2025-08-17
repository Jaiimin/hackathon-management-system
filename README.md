Hackathon Management System Overview:
The Hackathon Management System is a full-stack MERN application built with the intention of hackathon event management and running. It offers a centralized platform through which the participants can create teams, submit, and where the judges can mark the submissions in real-time. It offers secure user authentication and a real-time leaderboard that can be used for tracking the progress of the events, thus making it a slick and responsive experience for the participants and organizers as well.

This application contains the following features:

1.Secure User Authentication (Signup, Login, Logout)
2.User Profile Management
3.Team Management (Create, View, Update, and Delete Teams)
4.Project Submission for Teams
5.Project Scoring by Judges
6.Live Leaderboard ranked by average score

This application was extended from a pre-compiled starter app. I developed all core features related to team management, project submissions, scoring, and the leaderboard, while also tried integrating professional DevOps practices such as version control with Git and automated deployment with a CI/CD pipeline.

Prerequisites
Please install the following software and create accounts in the following web tools:

Node.js [https://nodejs.org/en]
Git [https://git-scm.com/]
VS Code Editor [https://code.visualstudio.com/]
MongoDB Account [https://account.mongodb.com/account/login]
GitHub Account [https://github.com/signup?source=login]

Project Setup and Installation
To run this project locally, please follow these steps:

1.Clone the repository:

git clone <your-repository-url>

2.Navigate to the project directory:

cd hackathon-management-system

3.Install all dependencies for the root, backend, and frontend:

npm install
cd backend
npm install
cd ../frontend
npm install
cd ..

4.Edit with your details in .env file in the backend folder :

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5001

5.Run the application:

npm run dev
This will start both the backend and frontend servers concurrently. The application will be available at http://localhost:3000.

To access the dashboard and test the application, please use the following credentials or you can register yourself as well is up to you :

Email: jemin@gmail.com
Password: jemin