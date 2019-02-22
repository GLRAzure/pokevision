const express = require('express');
const fetch = require('node-fetch');
const {getTrainingClient} = require('./azureCustomVisionTraining');

// uses dotenv to config env from a .env file for dev/testing
require('dotenv').config();

const app = express();

const trClient = getTrainingClient(process.env.CUSTOMVISION_TRAINING_ENDPOINT, process.env.CUSTOMVISION_TRAINING_KEY);

app.get('/projects', async (req,res) => {
  const responseBody = await trClient.GetProjects();
  res.json(responseBody);
});

app.get('/projects/:projectId/Tags', async (req,res) => {
  const responseBody = await trClient.GetTags(req.params.projectId);
  res.json(responseBody);
});


const port = process.env.PORT || 3000;

console.log(`Listening on port ${port}`);
app.listen(port);