// basic sanitization function
function sanitizeString(sourceString) {
	const cleanString = sourceString.trim().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	return cleanString;
};

function sanitizeEmail(sourceEmail) {
	const cleanEmail = sourceEmail.trim().replace(/[`~!#$%^&*()|\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
	return cleanEmail;
}

module.exports = {
	sanitizeString,
	sanitizeEmail
}