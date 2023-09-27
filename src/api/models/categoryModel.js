const { collection, addDoc, query, getDocs } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

const categoriesCollectionRef = collection(db, 'categories');

async function createDbCategory(category) {
	console.log('[/createDbCategory]');

	const categoryRef = await addDoc(categoriesCollectionRef, category);
	const createdTodoId = categoryRef._key.path.segments[1];

	return createdTodoId;
}

async function getAllDbCategories() {
	console.log('[/getAllDbCategories]');

	const getAllCategoriesQuery = query(categoriesCollectionRef);
	const querySnapshot = await getDocs(getAllCategoriesQuery);

	const categoriesList = [];

	querySnapshot.forEach((doc) => {
		categoriesList.push(doc.data());
	});

	return categoriesList;
}

module.exports = {
	createDbCategory,
	getAllDbCategories
};