AIRHOUSE - A ONLINE HOTEL ROOM BOOKING PORTAL

This project is a full-stack MEEN (MongoDB, Ejs, Express, Node.js) web application built as a initail project for my learning purposes. It serves as a dynamic portal for a tourists places online booking where authorized hotel manager can show case their beautiful spots,lodge buildings  through registering, logging in, and manage a personal dashboard of their management and posts.

Features-->

* Secure Authentication: Full user registration and login system built with Passport.js (passport-local-mongoose) using a persistent session-based strategy.

* Server: Uses isLoggedIn middleware to protect API routes, ensuring only logged-in users can access or modify data.

* CSS and Styling has done by (Bootstrap - React) and (fontawesome)

--> Personal User Dashboard: A complete "Create, Read, Update, Delete" (CRUD) dashboard where logged-in users can:

* View all others  posts.

* Create new posts (spot, place, etc.).

* Edit their existing posts via login.

* Delete their posts.
  
-------------------------------------------------------------------------------------------------------------------------------------------------
Getting Started-->

To run this project locally, you will need to run the Backend and Frontend servers in two separate terminals.

Prerequisites

Node.js (v18 or later)

MongoDB Server (Local): You must have MongoDB Community Server installed and running on your local machine.

You can use MongoDB Compass to visually manage your database.  

-------------------------------------------------------------------------------------------------------------------------------------------------

1.SERVER SETUP->
----------------

 2. Install all required npm packages
(npm install)

 3. Create the .env file
 Create a new file in the /Backend folder named (.env)


 4. Run the server
 This will start the server on http://localhost:8080
(nodemon app.js)

-------------------------------------------------------------------------------------------------------------------------------------------------

CREATE THIS FILE AT, /.env
----------------------------------

 This is the secret key for signing your session cookies
(SESSION_SECRET="your_random_secret_string_here")

 This is the connection string for your local MongoDB
(DATABASE_URL="mongodb://127.0.0.1:27017/Airhouse")

--------------------------------------------------------------------------------------------------------------------------------------------------


3. You're All Set!

Your application is now running.

Backend API: http://localhost:8080
