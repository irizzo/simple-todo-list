require('dotenv/config');
require('./firebaseConfig.js');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const todoController = require('./controllers/todoController');
const categoryController = require('./controllers/categoryController');
const statusController = require('./controllers/statusController');

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

// To do routes
app.post('/create-todo', todoController.createTodo);

// Category routes
app.post('/create-category', categoryController.createCategory);
app.get('/get-categories-list', categoryController.getAllCategories);
app.get('/get-category/:categoryCode', categoryController.getCategoryByCode);

// To do Status routes
app.post('/create-status', statusController.createTodoStatus);
app.get('/get-status-list', statusController.getAllStatus);
app.get('/get-status/:statusCode', statusController.getTodoStatusByCode);


app.listen(port, () => {
	console.log(`listening on port ${port}`);
});