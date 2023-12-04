const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define HTML routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/api/users', (req, res) => {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const users = JSON.parse(data);
      res.json(users);
    }
  });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const users = JSON.parse(data);
      users.push(newUser);
      fs.writeFile('db.json', JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(201).send('User created successfully');
        }
      });
    }
  });
});

// Front-end code
fetch('/api/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {
    // handle the response data
    // update the DOM accordingly
  })
  .catch(error => {
    // handle any errors
  });

fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: "value" }), // include the necessary request body data
})
  .then(response => {
    if (response.ok) {
      // handle the successful response
    } else {
      // handle the error response
    }
  })
  .catch(error => {
    // handle any errors
  });