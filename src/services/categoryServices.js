import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

// create a category
export async function createCategory(categoryData) {
	console.log('[service createCategory]');

	const createCategoryResponse = await httpClient.post({
		path: '/create-category',
		payload: categoryData
	});

	return {
		status: createCategoryResponse.success,
		message: dictionary?.[createCategoryResponse.code]
	};
}

// get categories list (all categories)
export async function getCategoriesList() {
	console.log('[service getCategoriesList]');

	const getCategoriesListResponse = await httpClient.get({
		path: '/get-categories-list'
	});

	return {
		status: getCategoriesListResponse.success,
		result: getCategoriesListResponse.result,
		message: dictionary?.[getCategoriesListResponse.code]
	};
}

// alter category

// delete category
