// Import Express.js
const express = require('express');
const fs = require('fs');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// Initialize an instance of Express.js
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Specify on which port the Express.js server will run
const PORT = 3001;

// I think this point something to the database
const database = require('./db/db.json');


// Static middleware pointing to the public folder - serves all the static files through the public folder
app.use(express.static('public'));

// Enables the route to the notes.html - button works - they have to put /notes in the URL (through a button normally) to take them to the public/notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// I think this sets up so that I can get the database contents
app.get('/api/notes', (req, res) => {
  // console.log(database) // it's working
  res.json(database);
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text ) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    const reviewString = JSON.stringify(newNote);
    fs.readFile('./db/db.json', "utf8", (error, data) => {
      // error ? console.log(error) : console.log(data);
      const notes = JSON.parse(data)
      notes.push(newNote)
      fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 2), (err) =>
        err
          ? console.error(err)
          : console.log(
            `Task for ${newNote.title} has been written to JSON file`
          )
      );
    })
    const response = {
      status: 'success',
      body: newNote,
    };
    // reload()
    // res.redirect('back');
    // res.status(201).json(response);
    console.log('I got to it');
    res.redirect('/api/notes')
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  console.log("req params", req.params.id);

  fs.readFile('./db/db.json', "utf8", (error, data) => {
    // error ? console.log(error) : console.log(data);
    const notes = JSON.parse(data)
    // console.log(notes);
    // console.log("=======================");

    const result = notes.filter(notes => notes.id !== req.params.id)
    // console.log(result);

    fs.writeFile(`./db/db.json`, JSON.stringify(result, null, 2), (err) =>
      err
        ? console.error(err)
        : console.log(
          `Task for ${req.params.id} has been taken from JSON file`
        )
    );
  })
  // const response = {
  //   status: 'success',
  //   body: newNote,
  // };
//   res.status(201).json(response);
// } else {
//   res.status(500).json('Error in posting review');
});



// This puts a listener on this port, it will always be the last thing in your file.
app.listen(PORT, () =>
  console.log(`Note Taker app listening at http://localhost:${PORT}`)
);


