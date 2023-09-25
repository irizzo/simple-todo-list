import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

export async function createTodo(todoData) {
	console.log('[serviceCreateTodo]');

	const createTodoResponse = await httpClient.post({ path: '/create-todo', payload: todoData });

	return { status: createTodoResponse.success, message: dictionary?.[createTodoResponse.code] };
}