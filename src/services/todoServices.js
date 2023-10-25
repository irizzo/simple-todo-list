import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

export async function createTodo(todoData) {
	console.log('[serviceCreateTodo]');

	const createTodoResponse = await httpClient.post({
		path: '/create-todo',
		payload: todoData
	});

	return {
		status: createTodoResponse.success,
		message: dictionary?.[createTodoResponse.code]
	};
};

export async function getTodosList() {
	console.log('[serviceGetTodosList]');

	const getTodosListResponse = await httpClient.get({
		path: '/get-todos-list'
	});

	return {
		status: getTodosListResponse.success.code,
		result: getTodosListResponse.result,
		message: dictionary?.[getTodosListResponse.code]
	};
};