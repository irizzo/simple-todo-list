import './dashboard.css';
import TodoCard from '@/components/TodoCard';

const todosList = [
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
	return (
		<div className='cards'>
			{
				todosList.map((todo) => {
					return <TodoCard key={todo.id} todoInfo={todo} />;
				})
			}
		</div>
	);
};