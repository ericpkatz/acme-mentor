const db = require('./db');
const { User } = db.models;
const express = require('express');
const path = require('path');
const app = express();

app.listen(process.env.PORT || 3000);

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(require('body-parser').json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.delete('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(()=> res.sendStatus(204))
    .catch(next);
});

app.post('/api/users', (req, res, next)=> {
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => user.update(req.body))
    .then( user => res.send(user))
    .catch(next);
});

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

app.get('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user => res.send(user))
    .catch(next);
});
db.syncAndSeed();
