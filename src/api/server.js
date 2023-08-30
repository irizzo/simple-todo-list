require('./firebaseConfig');

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.API_PORT;

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});