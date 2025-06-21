const express = require('express');
const bodyParser = require('body-parser');
const ADODB = require('node-adodb');
const path = require('path');
const app = express();

// Use body parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Static files (HTML form)
app.use(express.static(__dirname));

// MS Access DB connection
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=quiz_users.accdb;Persist Security Info=False;');

// Login POST handler
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT * FROM Users WHERE username='${username}' AND password='${password}'`;
    const users = await connection.query(query);

    if (users.length > 0) {
      res.send('✅ Login successful! Welcome ' + username);
    } else {
      res.send('❌ Invalid username or password');
    }
  } catch (error) {
    console.error('DB Error:', error);
    res.send('❌ Database connection error');
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
