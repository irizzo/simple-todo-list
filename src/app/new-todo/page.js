'use client';

import '@/styles/globalForm.css';
import './newTodo.css';

import { useState } from 'react';

// import categoriesList from '@/resources/categories';
// import { sanitizeString } from '@/resources/validations/sanitizations';
// import { dueDateValidation, titleValidation } from '@/resources/validations';

export default function NewTodo() {

	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ category, setCategory ] = useState('');

	function handleSubmit(e) {
	// 	e.preventDefault();

		// 	console.log(`title = ${title}`);
		// 	console.log(`description = ${description}`);
		// 	console.log(`dueDate = ${dueDate}`);
		// 	console.log(`category = ${category}`);

		// 	const formattedDueDate = new Date(dueDate);

		// 	// sanitize
		// 	const cleanTitle = sanitizeString(title);
		// 	const cleanDescripiton = sanitizeString(description);
		// 	const cleanCategory = sanitizeString(category);

		// 	// title validation
		// 	if (!titleValidation(cleanTitle)) {
		// 		window.alert('Invalid Title');
		// 		return;
		// 	}

		// 	// due date validation
		// 	if(!dueDateValidation(formattedDueDate)) {
		// 		window.alert('Invalid due date');
		// 		return;
		// 	}

		// 	// description validation

		// 	// category validation

	// 	// TODO: fetch api
	// 	// TODO: redirect to home
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Create new Todo</h2>
			<section className='form-item'>
				<label htmlFor="title">Title</label>
				<input name="title" type="text" required placeholder='title' onChange={(e) => { setTitle(e.target.value); }}></input>
			</section>

			<section className='form-item'>
				<label htmlFor="description">Description</label>
				<textarea name="description" placeholder='description' onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</section>

			<section className='form-item'>
				<label htmlFor="dueDate">Due Date</label>
				<input name="dueDate" type="datetime-local" onChange={(e) => { setDueDate(e.target.value); }}></input>
			</section>

			{/* <section className='form-item'>
				<label htmlFor="category">Category</label>
				<select id="category" onChange={(e) => { setCategory(e.target.value); }}>
					<option value="">--Please choose an option--</option>

					{categoriesList.map((status) => {
						return (
							<option key={status.code} value={status.code}>{status.name}</option>
						);
					})}
				</select>
			</section> */}
			<button className='outlined' type='submit'>Save</button>
		</form>
	);
};
