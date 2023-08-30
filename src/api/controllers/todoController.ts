import * as validations from '@/resources/validations';
import { sanitizeString } from '@/resources/validations/sanitizations';
import todoStatusList from '@/resources/status';
import responsesList from '@/resources/responses';

export async function createTodo(req: any, res: any) {
	const { title, description, dueDate } = req.body;

	// sanitização
	let clean = {
		title: '',
		description: '',
		dueDate: new Date(),
		status: todoStatusList[0]
	};

	clean.title = sanitizeString(title);

	if (description) {
		clean.description = sanitizeString(description);
	};

	clean.dueDate = dueDate; // TODO: sanitizar data

	// validação
	if (!validations.titleValidation(clean.title)) {
		console.log('[/createTodo] título inválido');

		const r = responsesList.invalidTitleResponse;
		res.status(r.status).send(r.content);
	}

	if (clean.description !== '' && !validations.titleValidation(clean.description)) {
		console.log('[/createTodo] descrição inválida');

		const r = responsesList.invalidDescriptionResponse;
		res.status(r.status).send(r.content);
		return;
	}

	if(!validations.dueDateValidation(clean.dueDate)) {
		console.log('[/createTodo] data inválida');

		const r = responsesList.invalidDueDateResponse;
		res.status(r.status).send(r.content);
		return;
	}

	// criar no DB

}

// const getAllByDueDate = (dueDate) => {
// 	// sanitização
// 	// validação
// 	// buscar no DB
// };
