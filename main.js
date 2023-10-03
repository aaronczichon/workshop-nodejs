const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello CarAPI!');
});

app.listen(port, () => {
  console.log('App started');
});