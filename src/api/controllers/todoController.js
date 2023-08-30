const { dueDateValidation, titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');
const Dictionary = require('../../resources/dictionary');
const todoStatusList = require('../../resources/status');

async function createTodo(req, res) {
	try {
		console.log(`req.body = ${JSON.stringify(req.body)}`);

		const { title, description, dueDate, category } = req.body;

		// sanitization
		let clean = {
			title: '',
			description: '',
			dueDate: new Date(),
			category: '',
			status: todoStatusList[0]
		};

		clean.title = sanitizeString(title);

		if (description) {
			clean.description = sanitizeString(description);
		};

		clean.dueDate = dueDate; // TODO: sanitize date

		clean.category = sanitizeString(category); // TODO: sanitize date

		// validação
		if (!titleValidation(clean.title)) {
			console.log('[/createTodo] título inválido');

			res.status(400).send({
				code: 'INVALID_TITLE',
				message: Dictionary.INVALID_TITLE
			});

			return;
		}

		if(!dueDateValidation(clean.dueDate)) {
			console.log('[/createTodo] data inválida');
			res.status(400).send({
				code: 'INVALID_DUE_DATE',
				message: Dictionary.INVALID_DUE_DATE
			});

			return;
		}

		// TODO: category validation

		// criar no DB

		console.log('fetch ok');

		res.status(200).send({
			code: 'CREATED_TODO',
			message: 'Successfully created todo 2',
			result: null
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