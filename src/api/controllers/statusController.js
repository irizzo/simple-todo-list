const { titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');
const generateIdentifierCode = require('../../resources/generateIdentifier');

const { createDbTodoStatus, getAllDbStatus } = require('../models/todoStatusModel');

async function createTodoStatus(req, res) {
	try {
		console.log('[createTodoStatus] (controller)');

		const { title, description } = req.body;

		console.log(`title = ${title}, description = ${description}`);

		let cleanTodoStatus = {
			title: '',
			description: '',
			code: ''
		};

		cleanTodoStatus.title = sanitizeString(title);

		if (description) {
			cleanTodoStatus.description = sanitizeString(description);
		};

		// validation
		if (!titleValidation(cleanTodoStatus.title)) {
			res.status(400).send({
				code: 'INVALID_TITLE',
				result: null,
				success: false
			});

			return;
		};

		const generatedIdentifierCode = generateIdentifierCode(cleanTodoStatus.title);

		console.log(`generatedIdentifierCode = ${generatedIdentifierCode}`);

		cleanTodoStatus.code = generatedIdentifierCode;

		// create on DB
		const createdTodoStatus = await createDbTodoStatus(cleanTodoStatus);

		res.status(200).send({
			code: 'CREATED_TODO_STATUS',
			result: createdTodoStatus,
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
};

async function getAllStatus(req, res) {
	console.log('[getAllStatus] (controller)');
	try {
		const todoStatusList = await getAllDbStatus();

		console.log(`todoStatusList = ${JSON.stringify(todoStatusList)}`);

		res.status(200).send({
			code: 'OK',
			result: todoStatusList,
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

module.exports = {
	createTodoStatus,
	getAllStatus
};