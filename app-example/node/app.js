'use strict';

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = 3000;

var stored = [];


// GET :: Obter/ler

app.get('/', (req, res) => {
  res.json('Funcionando!');
});

app.get('/total', (req, res) => {
  res.json(stored.length);
});

app.get('/word/:id', (req, res) => {
  var id = req.params.id - 1;
  var response = {};

  if (id < 0 || id >= stored.length) {
    response['error'] = 'Element does not exist.';
    res.status(500).json(response);
  }
  else {
    response[id+1] = stored[id];
    res.json(response);
  }
});

app.get('/words', (req, res) => {
  var response = {};
  var i;

  for (i = 0; i < stored.length; i++) {
    response[i+1] = stored[i];
  }

  res.json(response);
});


// POST :: Criar

app.post('/words', function (req, res) {
  var word = req.body.word;
  stored.push(word);

  res.json('OK');
});


// PUT :: Atualizar

app.put('/words/:id', function (req, res) {
  var newname = req.body.newname;
  var id = req.params.id - 1;

  if (id < 0 || id >= stored.length) {
    response['error'] = 'Could not update. Element does not exist.';
    res.status(500).json(response);
  }
  else {
    stored[id-1] = newname;
    res.json("OK");
  }
});


// DELETE :: Excluir

app.delete('/words/:id', function (req, res) {
  var id = req.params.id-1;

  if (id < 0 || id >= stored.length) {
    response['error'] = 'Could not delete. Element does not exist.';
    res.status(500).json(response);
  }
  else {
    stored.splice(id-1, 1);
    res.json("OK");
  }
});


// Start da app

app.listen(port, function () {
    console.log('Running on port %s', port);
});
