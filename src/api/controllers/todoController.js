const { dueDateValidation, titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');
const todoStatusList = require('../../resources/status');

const { createDbTodo } = require('../models/todoModel');

async function createTodo(req, res) {
	try {
		console.log('[/createTodo] (controller)');

		const { title, description, dueDate, category } = req.body;

		// sanitization
		let cleanTodo = {
			title: '',
			description: '',
			dueDate: new Date(),
			category: '',
			status: todoStatusList[0].code
		};

		cleanTodo.title = sanitizeString(title);

		if (description) {
			cleanTodo.description = sanitizeString(description);
		};

		cleanTodo.dueDate = dueDate; // TODO: sanitize date

		cleanTodo.category = sanitizeString(category); // TODO: sanitize category

		// validation
		if (!titleValidation(cleanTodo.title)) {

			res.status(400).send({
				code: 'INVALID_TITLE',
				result: null
			});

			return;
		}

		if(!dueDateValidation(cleanTodo.dueDate)) {
			res.status(400).send({
				code: 'INVALID_DUE_DATE',
				result: null
			});

			return;
		}

		// TODO: category validation

		// create on DB
		const createdTodo = await createDbTodo(cleanTodo);

		console.log(`[createTodo] createdTodo = ${JSON.stringify(createdTodo)}`);

		res.status(200).send({
			code: 'CREATED_TODO',
			result: createdTodo
		});

	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: 'INTERNAL_ERROR',
			result: error
		});
	}
}

// const getAllByDueDate = (dueDate) => {
// 	// sanitização
// 	// validação
// 	// buscar no DB
// };

module.exports = {
	createTodo
};