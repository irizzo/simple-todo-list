require('dotenv/config');

const httpClient = ({ baseURL}) => {
	const defaultHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8'
	});

	return {
		post: async ({ path, payload }) => {
			console.log(`[post] path = ${baseURL}${path}`);

			const res = await fetch(`${baseURL}${path}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: defaultHeaders
			});

			return res.json();
		},
		get: async (path) => {
			console.log(`[get] path = ${baseURL}${path}`);

			const res = await fetch(`${baseURL}${path}`, {
				method: 'GET',
				headers: defaultHeaders,
				data: JSON.stringify(payload)
			});

			return res.json();
		}
	};
};

export default httpClient({ baseURL: 'http://localhost:8080' });