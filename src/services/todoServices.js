import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

export async function createTodo(todo) {
	console.log('[serviceCreateTodo]');

	const createTodoResponse = await httpClient.post({ path: '/create-todo', payload: todo });

	if (createTodoResponse.status === 200) {
		console.log('createTodoResponse status 200');
		return { status: true, message: dictionary?.[createTodoResponse.code] };
	}

	console.log(`createTodoResponse status = ${createTodoResponse.status} `);

	console.log(dictionary?.[createTodoResponse.code]);

	return { status: false, message: dictionary?.[createTodoResponse.code] };
}