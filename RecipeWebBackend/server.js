//setup of dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(express.json({
  useNewUrlParser:true
}));

var db_url = "mongodb+srv://vineetdb:vineetdbpass@cluster0-gtcrz.gcp.mongodb.net/recipe_db?retryWrites=true&w=majority";

//Establishing the connection.
mongoose.connect(db_url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true}).
catch(error => console.log("Database connection error" + error));

//Validating connection
var connection = mongoose.connection;
connection.once('open', () => {
  console.log(`database connected successfully ! + ${connection.db.databaseName}`);
});

//Defining the routes
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);


//Express server.
app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});

