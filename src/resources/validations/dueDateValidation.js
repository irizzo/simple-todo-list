export default function dueDateValidation(date) {
	const today = new Date();

	if(today > date) {
		return false;
	}

	return true;
}