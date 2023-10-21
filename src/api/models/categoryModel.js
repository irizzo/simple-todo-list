const { db } = require('../firebaseConfig');

const categoriesCollectionRef = db.collection('categories');

async function createDbCategory(category) {
	console.log('[/createDbCategory]');

	const categoryRef = await categoriesCollectionRef.doc(category.code).set(category);

	return categoryRef;
}

async function getAllDbCategories() {
	console.log('[/getAllDbCategories]');

	const categoriesList = [];

	const snapshot = await categoriesCollectionRef.get();
	snapshot.forEach(doc => {
		categoriesList.push(doc.data());
	});

	return categoriesList;
}

async function getCategoryByCode(categoryCode) {
	console.log('[/getCategoryByCode]');

	const categoryRef = categoriesCollectionRef.doc(categoryCode);
	const doc = await categoryRef.get();
	if (!doc.exists) {
		return false;
	}

	return doc.data();
}

module.exports = {
	createDbCategory,
	getAllDbCategories,
	getCategoryByCode
};