'use client';

import '@/styles/globalForm.css';

import { useState } from 'react';

import * as todoServices from '@/services/todoServices';

const categoriesList = [ 'Academic', 'Personal' ]; // temporary

import { sanitizeString } from '@/resources/sanitization';
import { dueDateValidation, titleValidation } from '@/resources/validations';

export default function NewTodo() {
	let i = 0; // for the category map

	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ category, setCategory ] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const formattedDueDate = new Date(dueDate);

		// sanitize
		const cleanTitle = sanitizeString(title);
		const cleanDescripiton = sanitizeString(description);
		const cleanCategory = sanitizeString(category);

		// title validation
		if (!titleValidation(cleanTitle)) {
			window.alert('Invalid Title');
			return;
		}

		// due date validation
		if(!dueDateValidation(formattedDueDate)) {
			window.alert('Invalid due date');
			return;
		}

		const todoData = {
			title:  cleanTitle,
			description: cleanDescripiton,
			dueDate: formattedDueDate,
			category: cleanCategory
		};

		console.log(`todoData = ${JSON.stringify(todoData)}`);

		const createTodoRes = await todoServices.createTodo(todoData);

		if (createTodoRes.status === true) {
			// TODO: redirect to home page
			window.alert(createTodoRes.message || 'Success');
			return;
		};

		window.alert(createTodoRes.message || 'Internal Error. try Again Later');
		return;
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

			<section className='form-item'>
				<label htmlFor="category">Category</label>
				<select id="category" onChange={(e) => { setCategory(e.target.value); }}>
					<option value="" disabled defaultValue={false}>--Please choose an option--</option>

					{categoriesList.map((category) => {
						i++;
						return (
							<option key={i} value={category}>{category}</option>
						);
					})}
				</select>
			</section>
			<button className='outlined' type='submit'>Save</button>
		</form>
	);
};
