import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

// create a category
export async function createCategory(categoryData) {
	console.log('[service createCategory]');

	console.log(`categoryData = ${JSON.stringify(categoryData)}`);

	const createCategoryResponse = await httpClient.post({ path: '/create-category', payload: categoryData });

	console.log(`response = ${JSON.stringify({ status: createCategoryResponse.success, message: dictionary?.[createCategoryResponse.code] })} `)

	return { status: createCategoryResponse.success, message: dictionary?.[createCategoryResponse.code] };
}

// get one category

// get all categories

// alter category

// delete category
