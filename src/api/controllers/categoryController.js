const { titleValidation } = require('../../resources/validations');
const { sanitizeString } = require('../../resources/sanitization');
const generateIdentifierCode = require('../../resources/generateIdentifier');

const categoryModel = require('../models/categoryModel');

async function createCategory(req, res) {
	try {
		console.log('[createCategory] (controller)');

		const { title, description } = req.body;

		console.log(`title = ${title}, description = ${description}`);

		let cleanCategory = {
			title: '',
			description: '',
			code: ''
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
		};

		const generatedIdentifierCode = generateIdentifierCode(cleanCategory.title);

		console.log(`generatedIdentifierCode = ${generatedIdentifierCode}`);

		cleanCategory.code = generatedIdentifierCode;

		// create on DB
		const createdCategoryRes = await categoryModel.createDbCategory(cleanCategory);

		res.status(200).send({
			code: 'CREATED_CATEGORY',
			result: createdCategoryRes,
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

async function getAllCategories(req, res) {
	console.log('[getAllCategories] (controller)');

	try {
		const categoriesList = await categoryModel.getAllDbCategories();

		res.status(200).send({
			code: 'OK',
			result: categoriesList,
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

async function getCategoryByCode(req, res) {
	console.log('[getCategoryByCode] (controller)');

	try {
		const { categoryCode } = req.params;

		const foundCategory = await categoryModel.getCategoryByCode(categoryCode);

		if(!foundCategory) {
			res.status(404).send({
				code: 'CATEGORY_NOT_FOUND',
				result: null,
				success: false
			});

			return;
		}

		res.status(200).send({
			code: 'FOUND_CATEGORY',
			result: foundCategory,
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
	createCategory,
	getAllCategories,
	getCategoryByCode
};