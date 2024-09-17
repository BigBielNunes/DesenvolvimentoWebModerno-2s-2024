const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const path = require('path');
const db = require('./db');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do motor de visualização
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Página de Login
app.get('/', (req, res) => {
  res.render('login');
});

// Página de Cadastro
app.get('/register', (req, res) => {
  res.render('register');
});

// Página de Listagem de Usuários
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.render('users', { users: rows });
    }
  });
});

// Página de Edição de Usuário
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err || !row) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.render('edit-user', { user: row });
    }
  });
});

// Cadastro de Novo Usuário
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar');
    } else {
      res.redirect('/users');
    }
  });
});

// Atualização de Usuário
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [username, password, id], (err) => {
    if (err) {
      res.status(500).send('Erro ao atualizar usuário');
    } else {
      res.redirect('/users');
    }
  });
});

// Deletar Usuário
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).send('Erro ao deletar usuário');
    } else {
      res.redirect('/users');
    }
  });
});

// Login do Usuário
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err || !row) {
      res.status(401).send('Credenciais inválidas');
    } else {
      res.redirect('/users');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
