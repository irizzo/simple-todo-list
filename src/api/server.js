require('dotenv/config');
require('./firebaseConfig.js');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const todoController = require('./controllers/todoController');
const categoryController = require('./controllers/categoryController')

const app = express();
const port = 8080;

const corsOptions = {
	origin: 'http://localhost:3000'
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/create-todo', todoController.createTodo);

app.post('/create-category', categoryController.createCategory);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});