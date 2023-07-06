# E-commerce final back-end

## Description

This project was built to help you start E-commerce final back-end with a boilerplate which is fully ready for most of the basic back end tasks such as authorization, authentication, email confirmation and CRUD

##Technologies used

* Express.js
* PostgreSQL
* Sequelize-cli
* Nodemailer
* Multer 
* Becrypt
* Joi
* Jsonwebtoken


## Features

* User registration and login
* Authentication via JWT
* Email confirmation
* CRUD for users,products,categories,cart,cartItems
* PostgreSQL database
* Seeding

### Installing

```
git clone https://github.com/hayrapetyanhasmik/E-commerce final back-end.git
cd .. "your directory name"
npm install
```

## Getting Started

To test the application


* Download database from `https://www.postgresql.org` and choose a username and password for it. 
* To create database execute ```npx sequelize-cli db:create```.
* To migrate execute ```npx sequelize-cli db:migrate```.

* Example 

* Make a temporary gmail account for testing purposes
* Enable 2 factor authentication and click on app passwords 
* Add your email and password for the app in the .env file
* Example
EMAIL_SENDER='yourchosenemail@gmail.com'
EMAIL_PASSWORD='password
*Create a random string as JWT secret from `https://codebeautify.org/generate-random-string`
* Copy it and place it in your .env file
* Example
  SECRET="yourRandomString"
* Start the application  ```nodemon server.js```

* Register via http://localhost:5000/register with username, email, and password in the body as JSON format via Postman or any alternatives
* If successful, you should get a verification email
* Email link should look like this - http://localhost:5000/verify/:token  
* Opening the link will change your username confirmed field to true and show confirmed message in the response
* Login via http://localhost:5000/login with the same email and password
* Your response should have a JSON token
* Place it inside the Headers -> Authorization = Token
* Make a request to http://localhost:5000/users
* If you get 200 OK and {"users": []} as a result, everything was successul
* From there you can edit the app based on your needs
* If you want to seed your post database with some random information, run node seed.js in the seeds folder, click "y" to delete all previous recrods or anything else to just add data without deleting anything.



