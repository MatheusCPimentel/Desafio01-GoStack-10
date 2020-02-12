import { Router } from 'express';

const routes = new Router();

const projects = [];


// MIDDLEWARES FUNCTIONS:

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json ({ error: 'Project not found' });
  }

  return next();
}


routes.use((req, res, next) => {

  console.count("Requisitions");

  return next();
});


// PROJECTS:

// POST:

routes.post('/projects', (req, res) => {
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

routes.get('/projects', (req, res) => {
  return res.json(projects);
});


// PUT:

routes.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});


// DELETE:

routes.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});


// TASKS:

// POST:

routes.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});


// PUT:

routes.put('/projects/:id/tasks/:ptasks', checkProjectExists, (req, res) => {
  const { id, ptasks } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  
  project.tasks[ptasks] = title;
  
  return res.json(project);
});


// DELETE:

routes.delete('/projects/:id/tasks/:ptasks', checkProjectExists, (req, res) => {
  const { id, ptasks } = req.params;

  const project = projects.find(p => p.id == id);

  project.tasks.splice(ptasks, 1);

  return res.send();
})

export default routes;
