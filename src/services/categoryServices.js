import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

// create a category
export async function createCategory(categoryData) {
	console.log('[servicecreateCategory]');

	console.log(`categoryData = ${JSON.stringify(categoryData)}`);

	const createCategoryResponse = await httpClient.post({ path: '/create-category', payload: categoryData });

	if (createCategoryResponse.status === 200) {
		console.log('createCategoryResponse status 200');
		return { status: true, message: dictionary?.[createCategoryResponse.code] };
	}

	console.log(`createCategoryResponse status = ${createCategoryResponse.status} `);

	console.log(dictionary?.[createCategoryResponse.code]);

	return { status: false, message: dictionary?.[createCategoryResponse.code] };
}

// get one category

// get all categories

// alter category

// delete category
