import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

// create a category
export async function createCategory(categoryData) {
	console.log('[service createCategory]');

	const createCategoryResponse = await httpClient.post({ path: '/create-category', payload: categoryData });

	return { status: createCategoryResponse.success, message: dictionary?.[createCategoryResponse.code] };
}

// get one category

// get all categories

// alter category

// delete category
