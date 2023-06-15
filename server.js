// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Create Express.js routes for default '/', '/send' and '/routes' endpoints
// in order to get something they have to use this route. path and then callback function. request and response.  If the user hits this route the user is going to get res.send
// get because we want something from our server then slash is the route, second argument is a function that takes a request aand response, we are using the send function, it sends a string (sendFile is the function to send a file)
// This line is not working because of the above "public" declaration
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));


// these become links on the html so that users can navigate the site, then you reference these on the html so that you can move around a site.
app.get('/send', (req, res) => // if you want to send a file on any route
  res.sendFile(path.join(__dirname, 'public/sendFile.html')) // you can addd these words to go to another page
);

// this creates a route to send
app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/routes.html')) // doublt underrscore is called dunder score
);

// listen() method is responsible for listening for incoming connections on the specified port 
// This puts a listener on this port, it will always be the last thing in your file.
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
