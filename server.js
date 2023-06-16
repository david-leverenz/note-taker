// Require statements for all of the things I am going to use.  Port specification.
const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const path = require('path');
const uuid = require('./helpers/uuid');

// Initialize an instance of Express.js
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the public folder - serves all the static files through the public folder
app.use(express.static('public'));

// Enables the route to the notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// Creates route for the display of the database contents.
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Creates a route to post a new note. Uses the id creator to give each new entry a unique id. Reads the database and pushes the new note into it then write the database back down.
app.post('/api/notes', (req, res) => {
  
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
      fs.readFile('./db/db.json', "utf8", (error, data) => {
      error ? console.log(error) : console.log("Success");
      const notes = JSON.parse(data)
      notes.push(newNote)
      // console.log(notes);
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) =>
        err
          ? console.error(err)
          : console.log(
            `Task for ${newNote.title} has been written to JSON file`
          )
        );
    })
    res.json(notes)
    } else {
    res.status(500).json('Error in posting review');
  }
});

// Creates the path and logic for deleting a note.  It gets the appropriate id through parameter ":id".  Then it reads the database and filters out the req.params.id.  Then it writes the resulting data back down.
app.delete('/api/notes/:id', (req, res) => {
  
  fs.readFile('./db/db.json', "utf8", (error, data) => {
    if (error) throw error;
    const notes = JSON.parse(data)

    const result = notes.filter(notes => notes.id !== req.params.id);

    fs.writeFile('./db/db.json', JSON.stringify(result, null, 2), (err) =>
      err
        ? console.error(err)
        : res.json(result)
        )
      })
});

// This puts a listener on this port, it will always be the last thing in your file.
app.listen(PORT, () =>
  console.log(`Note Taker app listening at http://localhost:${PORT}`)
);


