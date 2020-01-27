const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

// GET:

server.get('/projects', (req, res) => {
  return res.json(projects);
})

// POST:

server.post('/projects', (req, res) => {
  const { title, tasks } = req.body;

  projects.push(title, tasks);

  return res.json(projects);

})

server.listen(3000);