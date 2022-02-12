# PlacementCell
An interface for employees of a company to fill in the data in the database and then download it in csv format.

# Features 
* Sign Up and Sign In for employees only
* Add new student to database
* View list of students and individual student's details such as college, status, scores in different courses, batch, interview details with name of company and date of interview
* Add new interview details to database (company name and interview date)
* Add student to an interview
* Display list of available interviews along with list of students assigned to each interview
* Update result status of an interview for individual students from the list itself
* View software jobs available in India and a link to view the job posting
* Sign Out for employess

## Tech Stack :
* Node.Js (Server side JavaScript runtime environment)
* ExpressJs (Web Application Framework for Node.Js)
* MongoDB (Cross Platform, Document oriented NoSQL Database)

## Getting Started :

### Prerequisites -

1. Install Node.Js
```
$ sudo apt-get update
$ sudo apt-get install nodejs
```
2. Install npm
```
$ sudo apt-get install npm
```
3. Install MongoDB
```
https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/
```
### Run Software

1. Clone Repo
```
$ git clone 
```
2. Change Directory
```
$ cd PlacementCell/
```
3. Install Dependencies 
```
$ npm install
```
4. Start server
```
$ PORT=8000 node server.js
```

Server would be running at port 8000. Open any browser. Access the project - http://localhost:8000/
