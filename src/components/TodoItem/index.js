export default function TodoItem(todoProps) {
	return (
		<div>
			<h1>{todoProps.title}</h1>

			<section>
				<p>{todoProps.description}</p>
			</section>

			<section>
				<p>{todoProps.dueDate.toString()}</p>
			</section>
		</div>
	);
}