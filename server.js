const express = require('express');
require('dotenv').config();
//const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');


//mongoose.Promise = global.Promise;

// Connecting to the database
dbConfig.connection();

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to fundooNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening");
});
module.exports = app