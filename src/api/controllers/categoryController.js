const { titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');

const { createDbCategory } = require('../models/categoryModel');

async function createCategory(req, res) {
	try {
		console.log('[createCategory] (controller)');

		const { title, description } = req.body;

		console.log(`title = ${title}, description = ${description}`);

		let cleanCategory = {
			title: '',
			description: ''
		};

		cleanCategory.title = sanitizeString(title);

		if (description) {
			cleanCategory.description = sanitizeString(description);
		};

		// validation
		if (!titleValidation(cleanCategory.title)) {
			res.status(400).send({
				code: 'INVALID_TITLE',
				result: null,
				success: false
			});

			return;
		}

		// create on DB
		const createdCategory = await createDbCategory(cleanCategory);

		console.log(`[createCategory] createdCategory = ${JSON.stringify(createdCategory)}`);

		res.status(200).send({
			code: 'CREATED_CATEGORY',
			result: createdCategory,
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
	createCategory
};