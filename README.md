🤖 AI-Genius Auth — Secure Authentication and Authorization System

This project is the backend security module for a SaaS platform called AI-Genius, built using Node.js, Express.js, and MongoDB.
The platform allows different types of users to access premium AI text and image generation models. Since AI models are expensive to run, the backend strictly controls who can access what by implementing JSON Web Tokens (JWT), bcrypt password hashing, and Role-Based Access Control (RBAC).
The goal is to ensure that only authorized users can use specific services and that unauthorized access is completely prevented.

🔐 What This Project Does
•	Verifies a user's identity through a secure login process

•	Maintains user authentication using short-lived and long-lived tokens
•	Controls access to AI features according to the user's role and subscription plan
•	Registers users and stores their passwords securely using bcrypt hashing with 10 salt rounds
•	Logs in users and returns two tokens — an Access Token (15 minutes) in the JSON response and a Refresh Token (7 days) in a secure httpOnly cookie so that client-side JavaScript cannot access it
•	Protects API routes using a custom JWT middleware called protect that reads the Authorization header on every request
•	Automatically issues a new Access Token when the old one expires via the refresh endpoint
•	Restricts route access based on user role using a middleware factory called restrictTo
•	Returns proper 401 Unauthorized or 403 Forbidden responses for invalid, expired, or missing tokens

👥 User Roles and Permissions
•	Free_User — can only access the basic free AI model endpoint
•	Premium_User — can access both free and premium AI model endpoints
•	Admin — has full access including administrative operations like purging cache

📡 API Endpoints
•	POST /api/auth/register — create a new user account
•	POST /api/auth/login — login and receive access and refresh tokens
•	POST /api/auth/refresh — get a new access token using the refresh token stored in the cookie
•	POST /api/auth/logout — remove the refresh token from the database and clear the cookie
•	GET /api/ai/free-model — open to all logged-in users
•	POST /api/ai/premium-model — Premium_User and Admin only
•	DELETE /api/ai/purge-cache — Admin only

🔄 How Token Refresh Works
Since access tokens expire after 15 minutes, the refresh endpoint reads the refresh token from the secure cookie, verifies it, and checks whether it exists in the database.
The database acts as a whitelist for valid refresh tokens. When a user logs out, the refresh token is removed from the database, making it invalid even if it has not yet expired. 
If verification is successful, a new access token is generated and returned.

⚙️ How to Run Locally
•	Clone the repository and open it in your terminal
•	Run npm install to install all dependencies
•	Copy .env.example to .env and fill in MONGO_URI, JWT_SECRET, JWT_ACCESS_EXPIRES, and JWT_REFRESH_EXPIRES
•	Run npm start to start the server or npm run dev for development mode with auto-reload
•	Import postman_collection.json into Postman to test the full workflow

🧪 Testing Workflow
The following workflow was tested and verified using Postman:
•	Registering users with different roles
•	Logging in and receiving both access and refresh tokens
•	Accessing the free AI model as any logged-in user
•	Attempting premium access as a Free_User and receiving a 403 Forbidden response
•	Accessing premium features as Admin and receiving a successful response
•	Generating a new access token using the refresh endpoint after the original token expires

🛡️ Security Features
•	All passwords are hashed with bcrypt using 10 salt rounds before being saved to the database
•	All secrets and config values are stored in a .env file and never hardcoded in the source code
•	The .env file is added to .gitignore to protect sensitive information
•	Refresh token is stored in an httpOnly, secure, sameSite cookie to prevent XSS attacks
•	Refresh tokens are verified against the database whitelist on every refresh request
•	JWT payload only contains id, email, and role — no sensitive data is stored in the token
•	Centralized error handling returns clean JSON error messages with correct HTTP status codes

🛠️ Tech Stack
Node.js, Express.js, MongoDB with Mongoose, jsonwebtoken for JWT, bcryptjs for password hashing, and dotenv for environment variable management.
The project follows the MVC structure to keep the code organized and maintainable.


