import { TodoInterface } from '@/resources/types';
import db from '@/api/firebaseConfig';

export async function createDbTodo(todo: TodoInterface) {
	const id = 'a'; // TODO: create function to generate uuid
	const todoRef = await db.collection('todos').doc(id).set(todo);

	console.log(`[/createUser] userRef = ${todoRef}`);

	return todoRef;
}