const { collection, addDoc } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

async function createDbTodoStatus(todoStatus) {
	console.log('[/createDbTodoStatus]');

	const todoStatusRef = await addDoc(collection(db, 'todoStatus'), todoStatus);
	const createdTodoStatusId = todoStatusRef._key.path.segments[1];

	return createdTodoStatusId;
}

module.exports = {
	createDbTodoStatus
};