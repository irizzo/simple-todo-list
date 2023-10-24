'use client';

import '@/styles/globalForm.css';

import { useState } from 'react';

import { sanitizeString } from '@/resources/sanitization';
import { titleValidation } from '@/resources/validations';

import * as categoryServices from '@/services/categoryServices';

export default function NewCategory() {
	const [ title, setTitle ] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const cleanTitle = sanitizeString(title);

		// title validation
		if (!titleValidation(cleanTitle)) {
			window.alert('Invalid Title');
			return;
		};

		const createCategoryRes = await categoryServices.createCategory({ title: cleanTitle });

		if (createCategoryRes.status === true) {
			// TODO: redirect to home page
			window.alert(createCategoryRes.message || 'Success');
			return;
		};

		window.alert(createCategoryRes.message || 'Internal Error. try Again Later');
		return;
	}

	return (
		<form onSubmit={handleSubmit} autoComplete='off'>
			<h2>Create Category</h2>
			<section className='form-item'>
				<label htmlFor="title">Category Title</label>
				<input name="title" type="text" required placeholder='Category s title' onChange={(e) => { setTitle(e.target.value); }}></input>
			</section>
			<button className='outlined' type='submit'>Save</button>
		</form>
	);
}
