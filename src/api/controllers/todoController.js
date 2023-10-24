const { dueDateValidation, titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');

const todoModel = require('../models/todoModel');

async function createTodo(req, res) {
	try {
		console.log('[/createTodo] (controller)');

		const { title, description, dueDate, categoryCode } = req.body;

		// sanitization
		let cleanTodo = {
			title: '',
			description: '',
			dueDate: new Date(),
			categoryCode,
			statusCode: 'NOT_STARTED'
		};

		cleanTodo.title = sanitizeString(title);

		if (description) {
			cleanTodo.description = sanitizeString(description);
		};

		cleanTodo.dueDate = dueDate; // TODO: sanitize date

		cleanTodo.categoryCode = sanitizeString(categoryCode); // TODO: sanitize category

		// validation
		if (!titleValidation(cleanTodo.title)) {

			res.status(400).send({
				code: 'INVALID_TITLE',
				result: null,
				success: false
			});

			return;
		}

		if(!dueDateValidation(cleanTodo.dueDate)) {
			res.status(400).send({
				code: 'INVALID_DUE_DATE',
				result: null,
				success: false
			});

			return;
		}

		// create on DB
		const createdTodo = await todoModel.createDbTodo(cleanTodo);

		console.log(`[createTodo] createdTodo = ${JSON.stringify(createdTodo)}`);

		res.status(200).send({
			code: 'CREATED_TODO',
			result: createdTodo,
			success: true
		});

	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: 'INTERNAL_ERROR',
			result: error,
			success: false
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