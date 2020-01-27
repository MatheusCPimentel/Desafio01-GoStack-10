const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


// POST:

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);

});


// GET:

server.get('/projects', (req, res) => {
  return res.json(projects);
});


// PUT:

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});


// DELETE:

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  projects.splice(id);

  return res.send();
});


// POST TASKS:

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
})

server.listen(3000);