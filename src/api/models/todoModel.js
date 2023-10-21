const { db } = require('../firebaseConfig');

const todosCollectionRef = db.collection('todos');

async function createDbTodo(todo) {
	console.log('[/createDbTodo]');

	const todoRef = await todosCollectionRef.add(todo);
	const createdTodoId = todoRef.id;

	return createdTodoId;
}

module.exports = {
	createDbTodo
};