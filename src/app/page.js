import './dashboard.css';
import TodoCard from '@/components/TodoCard';


const testInfo = {
	categoryCode: 'WORK',
	description: 'adadwdawcawc',
	dueDate: '2023-09-28T11:00:00.000Z',
	title: 'Work on project A',
	todoStatusCode: 'NOT_STARTED'
};

export default function Home() {
	return (
		<div className='cards'>
			<TodoCard todoInfo={testInfo} />
			<TodoCard todoInfo={testInfo} />
			<TodoCard todoInfo={testInfo} />
			<TodoCard todoInfo={testInfo} />
			<TodoCard todoInfo={testInfo} />
			<TodoCard todoInfo={testInfo} />
			<TodoCard todoInfo={testInfo} />
		</div>
	);
}