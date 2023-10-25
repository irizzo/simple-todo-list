'use client';

import './dashboard.css';
import TodoCard from '@/components/TodoCard';

import * as todoServices from '@/services/todoServices';

import { useState, useEffect } from 'react';

const todosList2 = [
	{
		categoryCode: 'WORK',
		description: 'adadwdawcawc',
		dueDate: '2023-09-28T11:00:00.000Z',
		title: 'Work on project A',
		todoStatusCode: 'NOT_STARTED',
		id: 1
	},
	{
		categoryCode: 'WORK',
		description: 'adadwdawcawc',
		dueDate: '2023-09-28T11:00:00.000Z',
		title: 'Work on project B',
		todoStatusCode: 'NOT_STARTED',
		id: 2
	},
	{
		categoryCode: 'WORK',
		description: 'adadwdawcawc',
		dueDate: '2023-09-28T11:00:00.000Z',
		title: 'Work on project C',
		todoStatusCode: 'NOT_STARTED',
		id: 3
	},
	{
		categoryCode: 'WORK',
		description: 'adadwdawcawc',
		dueDate: '2023-09-28T11:00:00.000Z',
		title: 'Work on project D',
		todoStatusCode: 'NOT_STARTED',
		id: 4
	}
];

export default function Home() {
	const [ todosList, setTodosList ] = useState(false);

	async function loadTodos() {
		const l = await todoServices.getTodosList();

		if(l.result.length === 0 || l.status === false) {
			setTodosList(false);
		} else {
			setTodosList(l.result);
		}
	}
	useEffect(() => {
		loadTodos();
	}, []);

	return (
		<div className='cards'>
			{ todosList ?
				todosList.map((todo) => {
					return <TodoCard key={todo.id} todoInfo={todo} />;
				})
				:
				<p>No tasks found</p>
			}
		</div>
	);
};