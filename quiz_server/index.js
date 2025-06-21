const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let leaderboard = [];


app.get('/leaderboard', (req, res) => {
  
  leaderboard.sort((a, b) => b.score - a.score);
  res.json(leaderboard);
});


app.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;

  if (!name || score == null) {
    return res.status(400).json({ error: 'Name and score are required' });
  }

  leaderboard.push({ name, score });
  res.json({ message: 'Score added successfully', leaderboard });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
