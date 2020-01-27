const express = require('express');

const server = express();

server.get('/users', (req, res) => {
  return res.send('Hello!');
})

server.listen(3000);