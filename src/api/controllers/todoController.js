const { dueDateValidation, titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');
const Dictionary = require('../../resources/dictionary');
const todoStatusList = require('../../resources/status');

const { createDbTodo } = require('../models/todoModel');

async function createTodo(req, res) {
	try {
		console.log('[/createTodo] (controller)');
		console.log(`JSON.stringify(req.body)= ${JSON.stringify(req.body)}`);
		console.log(`JSON.stringify(req.headers)= ${JSON.stringify(req.headers)}`);

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

		// validação
		if (!titleValidation(cleanTodo.title)) {
			console.log('[/createTodo] título inválido');

			res.status(400).send({
				code: 'INVALID_TITLE',
				message: Dictionary.INVALID_TITLE
			});

			return;
		}

		if(!dueDateValidation(cleanTodo.dueDate)) {
			console.log('[/createTodo] data inválida');
			res.status(400).send({
				code: 'INVALID_DUE_DATE',
				message: Dictionary.INVALID_DUE_DATE
			});

			return;
		}

		// TODO: category validation

		console.log('everything ok, creating on DB');
		// criar no DB
		const createdTodo = await createDbTodo(cleanTodo);

		console.log(`[createTodo] createdTodo = ${JSON.stringify(createdTodo)}`);

		res.status(200).send({
			code: 'CREATED_TODO',
			message: 'Successfully created todo',
			result: createdTodo
		});

	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: 'INTERNAL_ERROR',
			message: 'erro inesperado',
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