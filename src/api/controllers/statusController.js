const { titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');
const generateIdentifierCode = require('../../resources/generateIdentifier');

const statusModel = require('../models/statusModel');

async function createStatus(req, res) {
	try {
		console.log('[createStatus] (controller)');

		const { title } = req.body;

		let cleanStatus = {
			title: '',
			code: ''
		};

		cleanStatus.title = sanitizeString(title);

		// validation
		if (!titleValidation(cleanStatus.title)) {
			res.status(400).send({
				code: 'INVALID_TITLE',
				success: false
			});

			return;
		};

		const generatedIdentifierCode = generateIdentifierCode(cleanStatus.title);

		cleanStatus.code = generatedIdentifierCode;

		// create on DB
		const createdStatus = await statusModel.createDbStatus(cleanStatus);

		res.status(200).send({
			code: 'CREATED_TODO_STATUS',
			result: createdStatus,
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
		const statusList = await statusModel.getAllDbStatus();

		// console.log(`statusList = ${JSON.stringify(statusList)}`);

		res.status(200).send({
			code: 'OK',
			result: statusList,
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

async function getStatusByCode(req, res) {
	console.log('[getStatusByCode] (controller)');

	try {
		const { statusCode } = req.params;

		const foundStatus = await statusModel.getStatusByCode(statusCode);

		if (!foundStatus) {
			res.status(404).send({
				code: 'TODO_STATUS_NOT_FOUND',
				result: null,
				success: false
			});

			return;
		}

		res.status(200).send({
			code: 'FOUND_TODO_STATUS',
			result: foundStatus,
			success: true
		});

	} catch (error) {
		console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: 'INTERNAL_ERROR',
			result: error,
			success: false
		});
	};
};

module.exports = {
	createStatus,
	getAllStatus,
	getStatusByCode
};