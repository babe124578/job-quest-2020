const bodyParser = require('body-parser');
const { validate } = require('express-jsonschema');
const express = require('express');
const app = express();
const port = 80;
const { MongoClient } = require('mongodb');
const uri = 'mongodb://root:password@back-end_mongo_1:27017/admin';

const jokeRepo = require('./src/repositories/jokes');
const mongoAdapter = require('./src/adapters/mongodb');
const { text } = require('body-parser');

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log('Connected to Database');
    const db = client.db('job-quest');

    app.use(bodyParser.json());

    app.get('/jokes', async (req, res) => {
      let data = await jokeRepo.getAllJokes(db);
      let status_code = data.length === 0 ? 204 : 200;
      res
        .status(status_code)
        .set('Content-Type', 'application/json')
        .send(data);
    });

    app.post('/jokes', async (req, res) => {
      let username = req.headers.username;
      let password = req.headers.password;
      let text = req.body.text;
      if (text === undefined) {
        res
          .status(400)
          .set('Content-Type', 'application/json')
          .send({ error: 'Cannot find any text in body' });
        return;
      }
      let data = await jokeRepo.addJoke(db, text, username, password);
      res
        .status(data.status_code)
        .set('Content-Type', 'application/json')
        .send(data.data);
    });

    app.get('/jokes/:id', async (req, res) => {
      let id = parseInt(req.params.id);
      let data = await jokeRepo.getJoke(db, id);
      let status_code = data.length === 0 ? 404 : 200;
      res
        .status(status_code)
        .set('Content-Type', 'application/json')
        .send(data);
    });

    app.delete('/jokes/:id', async (req, res) => {
      let id = parseInt(req.params.id);
      let username = req.headers.username;
      let password = req.headers.password;

      let data = await jokeRepo.deleteJoke(db, id, username, password);
      res
        .status(data.status_code)
        .set('Content-Type', 'application/json')
        .send(data.data);
    });

    app.post('/jokes/:id/like', async (req, res) => {
      let id = parseInt(req.params.id);
      let username = req.headers.username;
      let password = req.headers.password;

      let data = await jokeRepo.likeJoke(db, id, username, password);
      res
        .status(data.status_code)
        .set('Content-Type', 'application/json')
        .send(data.data);
    });

    app.post('/jokes/:id/dislike', async (req, res) => {
      let id = parseInt(req.params.id);
      let username = req.headers.username;
      let password = req.headers.password;

      let data = await jokeRepo.dislikeJoke(db, id, username, password);
      res
        .status(data.status_code)
        .set('Content-Type', 'application/json')
        .send(data.data);
    });

    app.use(function (err, req, res, next) {
      var responseData;

      if (err.name === 'JsonSchemaValidation') {
        console.log(err.message);
        res.status(400);
        responseData = {
          statusText: 'Bad Request',
          jsonSchemaValidation: true,
          validations: err.validations,
        };
        if (req.xhr || req.get('Content-Type') === 'application/json') {
          res.json(responseData);
        } else {
          res.render('badrequestTemplate', responseData);
        }
      } else {
        next(err);
      }
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
