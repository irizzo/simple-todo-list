const { collection, addDoc, query, getDocs, where } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

const todoStatusCollectionRef = collection(db, 'todoStatus');

async function createDbTodoStatus(todoStatus) {
	console.log('[/createDbTodoStatus]');

	const todoStatusRef = await addDoc(todoStatusCollectionRef, todoStatus);
	const createdTodoStatusId = todoStatusRef._key.path.segments[1];

	return createdTodoStatusId;
}

async function getAllDbStatus() {
	console.log('[/getAllDbStatus]');

	const getAllTodoStatusQuery = query(todoStatusCollectionRef);
	const querySnapshot = await getDocs(getAllTodoStatusQuery);

	const todoStatusList = [];

	querySnapshot.forEach((doc) => {
		todoStatusList.push(doc.data());
	});

	return todoStatusList;
}

async function getStatusByCode(statusCode) {
	console.log('[/getStatusByCode]');

	const getTodoStatusQuery = query(todoStatusCollectionRef, where('code', '==', statusCode));
	const querySnapshot = await getDocs(getTodoStatusQuery);

	if(querySnapshot.length === 0) {
		return false;
	}

	return querySnapshot[0].data();
}

module.exports = {
	createDbTodoStatus,
	getAllDbStatus,
	getStatusByCode
};
