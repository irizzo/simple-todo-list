const { collection, addDoc } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

async function createDbTodo(todo) {
	console.log('[/createDbTodo]');
	
	const todoRef = await addDoc(collection(db, 'todos'), todo);
	const createdTodoId = todoRef._key.path.segments[1];


	return createdTodoId;
}

module.exports = {
	createDbTodo
};