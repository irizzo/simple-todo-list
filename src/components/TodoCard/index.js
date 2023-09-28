import './todoCard.css';

export default function TodoCard(props) {
	const {
		todoInfo
	} = props;

	return(
		<div className='card-container'>
			<section className='main-info'>
				<h2>{todoInfo.title}</h2>
				<p className='highlight-text'>{todoInfo.dueDate}</p>
			</section>

			<section className='description'>
				<p>{todoInfo.description}</p>
			</section>

			<section className='aditional-info'>
				<span>{todoInfo.status}</span>
				<span>{todoInfo.category}</span>
			</section>
		</div>
	)
}