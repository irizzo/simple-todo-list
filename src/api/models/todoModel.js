const { collection, addDoc } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

const generateUUID = require('../../resources/generateUUID');

async function createDbTodo(todo) {
	console.log('[/createDbTodo]');
	// const id = generateUUID();

	// const todoRef = await db.collection('todos').doc(id).set(todo);

	const todoRef = await addDoc(collection(db, 'todos'), todo);
	const createdTodoId = todoRef._key.path.segments[1];


	return createdTodoId;
}

module.exports = {
	createDbTodo
};