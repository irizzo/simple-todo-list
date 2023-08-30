
export default function titleValidation(title) {

	if (!title || title.length < 3) {
		return false;
	}

	return true;
}