// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// I think this point something to the database
const database = require('./db/db.json');

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Enables the route to the notes.html - button works
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// I think this sets up so that I can get the database contents
app.get('/api/notes', (req, res) =>
  res.json(database));

// I need to push things into a server database from the front-end (like local storage I think) the database is db.json amd I going to need to make a sontructor function (shudder) that does this?

// need a post method
// app.post

// need a delete mothod
// app.delete

// listen() method is responsible for listening for incoming connections on the specified port 
// This puts a listener on this port, it will always be the last thing in your file.
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
