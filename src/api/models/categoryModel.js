const { collection, addDoc } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

async function createDbCategory(category) {
	console.log('[/createDbCategory]');

	const categoryRef = await addDoc(collection(db, 'categories'), category);
	const createdTodoId = categoryRef._key.path.segments[1];

	return createdTodoId;
}

module.exports = {
	createDbCategory
};