EventBasedApplication

API Details
Postman Documentation: https://documenter.getpostman.com/view/24770848/2sA3kbfHm9

Main Entry Point
server.js

Database Connection
The application supports two database options: Supabase and MongoDB. The database connection is handled in the supabase.js file.

Database Options

Supabase:
The application can use Supabase as the primary database.
The Supabase connection details, such as the URL and API key, are stored in environment variables.
The Supabase connection is established using the @supabase/supabase-js library.

MongoDB:
The application can also use MongoDB as the database.
The MongoDB connection details, such as the URI, are stored in environment variables.
The MongoDB connection is established using the mongodb library.


Architecture
The application follows a Controller-DAO (Data Access Object) approach. The main components are:

Controllers:

The controller files handle the incoming requests, extract the necessary parameters, and call the corresponding DAO functions.

DAOs:
The DAO files contain the logic to interact with the database, such as creating, reading, updating, and deleting data.
The DAO files handle the database-specific implementation, supporting both Supabase and MongoDB.
Models:
The model files define the structure of the data, including the eventModel, sessionModel, and userModel.


Routes:
The routes are defined to provide a clear separation of concerns and make the application more organized.


Getting Started
Start the Application:
Run the command nodemon start to start the application.