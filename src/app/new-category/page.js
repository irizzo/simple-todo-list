'use client';

import '@/styles/globalForm.css';

import { useState } from 'react';

import { sanitizeString } from '@/resources/sanitization';
import { titleValidation } from '@/resources/validations';

import * as categoryServices from '@/services/categoryServices';

export default function NewCategory() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const cleanTitle = sanitizeString(title);

		// title validation
		if (!titleValidation(cleanTitle)) {
			window.alert('Invalid Title');
			return;
		}

		const categoryData = {
			title: cleanTitle,
			description
		};

		console.log(`categoryData = ${JSON.stringify(categoryData)}`);

		const createCategoryRes = await todoServices.createCategory(todoData);

		console.log(`createCategoryRes = ${JSON.stringify(createCategoryRes)}`);

		window.alert(createCategoryRes?.message || 'Internal Error. try Again Later');
		return;
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Create Category</h2>
			<section className='form-item'>
				<label htmlFor="title">Category Title</label>
				<input name="title" type="text" required placeholder='Category s title' onChange={(e) => { setTitle(e.target.value); }}></input>
			</section>

			<section className='form-item'>
				<label htmlFor="description">Description</label>
				<textarea name="description" placeholder='Category s description' onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</section>

			<button className='outlined' type='submit'>Save</button>
		</form>
	);
}
