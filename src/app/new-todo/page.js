'use client';

import '@/styles/globalForm.css';

import { useState, useEffect } from 'react';

import * as todoServices from '@/services/todoServices';
import * as categoryServices from '@/services/categoryServices';

import { sanitizeString } from '@/resources/sanitization';
import { dueDateValidation, titleValidation } from '@/resources/validations';

export default function NewTodo() {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ categoryCode, setCategoryCode ] = useState('');

	const [ categoriesList, setCategoriesList ] = useState(false);

	async function loadCategories() {
		const c = await categoryServices.getCategoriesList();

		if (c.result.length === 0 || c.status === false) {
			setCategoriesList(false);
		}

		setCategoriesList(c.result);
	}

	useEffect(() => {
		loadCategories();
	}, []);

	// console.log(`categoriesList = ${JSON.stringify(categoriesList)}`);

	async function handleSubmit(e) {
		e.preventDefault();

		const formattedDueDate = new Date(dueDate);

		// sanitize
		const cleanTitle = sanitizeString(title);
		const cleanDescripiton = sanitizeString(description);
		const cleanCategoryCode = sanitizeString(categoryCode);

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
			categoryCode: cleanCategoryCode
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
				<select id="category" onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue="">--Please choose an option--</option>

					{	categoriesList ?
						categoriesList.map((category) => {
							return (
								<option key={category.code} value={category.code}>{category.title}</option>
							);
						})
						:
						<option disabled value="">No categories found</option>
					}
				</select>
			</section>
			<button className='outlined' type='submit'>Save</button>
		</form>
	);
};
