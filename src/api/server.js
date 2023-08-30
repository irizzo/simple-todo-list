require('./firebaseConfig');

const express = require('express');
const cors = require('cors');

const todoController = require('./controllers/todoController');

const app = express();
const port = process.env.API_PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/create-todo', todoController.createTodo);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});