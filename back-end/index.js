const bodyParser = require('body-parser');
const { validate } = require('express-jsonschema');
const express = require('express');
const app = express();
const port = 80;
const { MongoClient } = require('mongodb');
const uri = 'mongodb://root:password@back-end_mongo_1:27017/admin';

const jokeRepo = require('./src/repositories/jokes');
const { addJokeSchema, registerSchema } = require('./src/utilities/schema');
MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log('Connected to Database');
    const db = client.db('job-quest');

    app.use(bodyParser.json());

    app.get('/', async (req, res) => {
      let jokes = await jokeRepo.getAllJokes(db);
      let status_code = jokes.length === 0 ? 204 : 200;
      res
        .status(status_code)
        .set('Content-Type', 'application/json')
        .send(jokes);
    });

    app.post('/', validate({ body: addJokeSchema }), async (req, res) => {
      let username = req.headers.username;
      let password = req.headers.password;
      let text = req.body.text;
      let response = await jokeRepo.addJoke(db, text, username, password);
      res
        .status(response.status_code)
        .set('Content-Type', 'application/json')
        .send(response.data);
    });

    app.get('/:id', async (req, res) => {
      let id = parseInt(req.params.id);
      let joke = await jokeRepo.getJoke(db, id);
      res
        .status(joke.status_code)
        .set('Content-Type', 'application/json')
        .send(joke.data);
    });

    app.delete('/:id', async (req, res) => {
      let id = parseInt(req.params.id);
      let username = req.headers.username;
      let password = req.headers.password;

      let response = await jokeRepo.deleteJoke(db, id, username, password);
      res
        .status(response.status_code)
        .set('Content-Type', 'application/json')
        .send(response.data);
    });

    app.post('/:id/like', async (req, res) => {
      let id = parseInt(req.params.id);
      let username = req.headers.username;
      let password = req.headers.password;

      let response = await jokeRepo.likeJoke(db, id, username, password);
      res
        .status(response.status_code)
        .set('Content-Type', 'application/json')
        .send(response.data);
    });

    app.post('/:id/dislike', async (req, res) => {
      let id = parseInt(req.params.id);
      let username = req.headers.username;
      let password = req.headers.password;

      let response = await jokeRepo.dislikeJoke(db, id, username, password);
      res
        .status(response.status_code)
        .set('Content-Type', 'application/json')
        .send(response.data);
    });

    app.put(
      '/register',
      validate({ body: registerSchema }),
      async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        let response = await jokeRepo.register(db, username, password);
        res
          .status(response.status_code)
          .set('Content-Type', 'application/json')
          .send(response.data);
      }
    );

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
