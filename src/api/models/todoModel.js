const { db } = require('../firebaseConfig');

const todosCollectionRef = db.collection('todos');

async function createDbTodo(todo) {
	console.log('[/createDbTodo]');

	const todoRef = await todosCollectionRef.add(todo);
	const createdTodoId = todoRef.id;

	return createdTodoId;
}

async function getAllDbTodos() {
	console.log('[getAllDbTodos]');;

	const todosList = [];

	const snapshot = await todosCollectionRef.get();
	snapshot.forEach(doc => {
		todosList.push({
			id: doc.id,
			...doc.data()
		});
	});

	return todosList;
}

module.exports = {
	createDbTodo,
	getAllDbTodos
};