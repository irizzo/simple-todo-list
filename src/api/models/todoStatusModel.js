// const { collection, addDoc, query, getDocs, where } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

const todoStatusCollectionRef = db.collection('todoStatus');

async function createDbTodoStatus(todoStatus) {
	console.log('[/createDbTodoStatus]');

	const todoStatusRef = await todoStatusCollectionRef.doc(todoStatus.code).set(todoStatus);

	return todoStatusRef;
};

async function getAllDbStatus() {
	console.log('[/getAllDbStatus]');

	const todoStatusList = [];

	const snapshot = await todoStatusCollectionRef.get();
	snapshot.forEach(doc => {
		todoStatusList.push(doc.data());
	});

	return todoStatusList;
}

async function getStatusByCode(statusCode) {
	console.log('[/getStatusByCode]');

	const statusRef = todoStatusCollectionRef.doc(statusCode);
	const doc = await statusRef.get();
	if (!doc.exists) {
		return false;
	}

	return doc.data();
}

module.exports = {
	createDbTodoStatus,
	getAllDbStatus,
	getStatusByCode
};
