// const { collection, addDoc, query, getDocs, where } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

const statusCollectionRef = db.collection('status');

async function createDbStatus(status) {
	console.log('[/createDbStatus]');

	const statusRef = await statusCollectionRef.doc(status.code).set(status);

	return statusRef;
};

async function getAllDbStatus() {
	console.log('[/getAllDbStatus]');

	const statusList = [];

	const snapshot = await statusCollectionRef.get();
	snapshot.forEach(doc => {
		statusList.push(doc.data());
	});

	return statusList;
}

async function getStatusByCode(statusCode) {
	console.log('[/getStatusByCode]');

	const statusRef = statusCollectionRef.doc(statusCode);
	const doc = await statusRef.get();
	if (!doc.exists) {
		return false;
	}

	return doc.data();
}

module.exports = {
	createDbStatus,
	getAllDbStatus,
	getStatusByCode
};
