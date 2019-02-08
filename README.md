
What used in this course
- Heroku CLI : https://devcenter.heroku.com/articles/heroku-cli for deploying
- Heroku : https://www.heroku.com/ for deploying
- MLab(MongoDB Cloud) : https://mlab.com/login/ for checking MongoDB Database
- Postman : https://www.getpostman.com/ for checking backend
- font awesome : https://fontawesome.com/start
- bootstrap : https://getbootstrap.com/docs/4.2/getting-started/introduction/
- chapter 6
  <code><pre>
    npm init
    npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
    npm i -D nodemon
    npm server
    npm start
    npm run server
  </pre></code>
- chapter 10
  <code><pre>
    npm i gravatar
  </pre></code>
- chapter 30
  <code><pre>
    npm i -g create-react-app
    npm i -g npm
    create-react-app client
    cd client
    npm start
    npm i concurrently
    npm run dev
  </pre></code>
- chapter 33
  <code><pre>
    cd client
    npm i react-router-dom
  </pre></code>
- chapter 37
  <code><pre>
    cd client
    npm i axios
  </pre></code>
- chapter 38
  <code><pre>
    npm i classnames
  </pre></code>
- chapter 40
  <code><pre>
    npm i redux react-redux redux-thunk
  </pre></code>
- chapter 43
  <code><pre>
    npm i jwt-decode
  </pre></code>
- chapter 59
  <code><pre>
    cd client
    npm i react-moment moment
  </pre></code>
- chapter 76
  <code><pre>
    heroku
    heroku login
    heroku create
    heroku git:remote -a intense-citadel-11062 (this depends on who created)
  </pre></code>
- chapter 77
  <code><pre>
    cd client
    npm run build
    cd ..
    git add .
    git commit -am 'Prepared for deploy'
    git push heroku master
    heroku open
  </pre></code>
</br>------------------------------------------------------------------------

1. Introduction
  - Welcome To The Course
  - A Look At the Main App
  - Before We Begin
  - VSCode Setup
  
2. Basic Express Setup
  - MongoDB Setup With mLab
  - Install Dependencies & Basic Server Setup
  - Connecting To MongoDB With Mongoose
  - Route Files With Express Router
  
3. User API Routes & JWT Authentication
  - Creating The User Model
  - User Registration & Postman
  - Email & Password Login
  - Creating The JWT
  - Passport JWT Authentication Strategy
  - Validation Handlers - 1
  - Validation Handlers - 2
  
4. Profile API Routes
  - Aside - Front End Visual
  - Creating The Profile Model
  - Current User Profile Route
  - Create & Update Profile Routes
  - Profile Field Validations
  - More Profile API Routes
  - Add Experience & Education Routes
  - Delete Education & Experience Routes

5. Post API Routes
  - Creating The Post Model
  - Post Create Route
  - Get & Delete Post Routes
  - Post Like & Unlike Routes
  - Add & Remove Comment Routes
  
6. Getting Started With React & The Frontend
  - A Look At The BootStrap Theme & UI
  - Implementing React
  - Bootstrap & Assets Setup
  - Basic Layout
  
7. React Router & Component State
  - React Router Setup(v4)
  - Creating The Register Form With State
  - Creating The Login Form With State
  - bind(this) Alternative Using Arrow Functions
  - Testing Registration With Our Form - No Redux Yet
  - Error Handling & Display
  
8. Redux & Authentication
  - Why We Need Redux
  - Redux Store & Chrome Extension Setup
  - Redux Action & Reducer Workflow Example
  - Registration & The Error Reducer
  - Redux Login Action & Set Current User
  - Login Form Functionality
  - Logout & Conditional Navbar Links
  
9. Dashboard & Profile State - Part 1
  - TextFieldGroupInput Component
  - Profile Reducer & Get Current Profile
  - Spinner Component & Dashboard Start
  - Private Route Setup
  - CreateProfile Component & Route
  - Form Field Components
  - Create Profile Form
  - Create Profile Functionality
  
10. Dashboard & Profile State - Part 2
  - Profile Actions Component & Delete Account
  - Edit Profile Component
  - Add Experience Form
  - Add Experience Functionality
  - Add Education Form & Functionality
  - Dashboard Experience Display & Delete
  - Dashboard Education Display & Delete
  
11. Profile Display
  - Profiles Component & getProfiles Action
  - Profile Items
  - Profile By Handle & Sub Components
  - Profile Header
  - Profile About & Credentials
  - Profile Github & Touch Ups

12. Posts & Comments
  - Post State & addPost Action
  - Posts & Post Form Component
  - getPosts Action & PostFeed Component
  - Post Item Component
  - Delete, Like & Unlike Posts
  - Single Post Display
  - Comment Form Component & Action
  - Comment Display & Delete
  
13. Prepare & Deploy
  - Securing Our Keys
  - Heroku Setup
  - Post Build & Deployment
  - UPDATE : Using MongoDB Atlas Instead of mLab
