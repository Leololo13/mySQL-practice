import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'test',
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('hello world');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES(?)';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    console.log(data);
    if (err) return res.json(err);
    return res.json('Book has been created succesfully');
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'Delete from books where id = ?';

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been deleted succesfully');
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'update books set `title` = ?, `desc`=?, `price` = ?, `cover`=? where id = ?';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been updated succesfully');
  });
});

app.listen(8800, () => {
  console.log('connected to backend!!!');
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
