// basic sanitization function
export function sanitizeString(sourceString) {
	console.log(`sourceString = ${sourceString}`);

	sourceString.trim();

	const cleanString = sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

	console.log(`cleanString = ${cleanString}`);

	return cleanString;
};

export function sanitizeEmail(sourceEmail) {
	console.log(`sourceString = ${sourceEmail}`);

	const cleanEmail = sourceEmail.trim().replace(/[`~!#$%^&*()|\-=?;:'",<>\{\}\[\]\\\/]/gi, '');

	return cleanEmail;
}