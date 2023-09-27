require('dotenv/config');

const httpClient = ({ baseURL}) => {
	const defaultHeaders = new Headers({
		'Content-type': 'application/json; charset=UTF-8'
	});

	return {
		post: async ({ path, payload }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'POST',
				body: JSON.stringify(payload),
				headers: defaultHeaders
			});

			return res.json();
		},
		get: async ({ path }) => {
			const res = await fetch(`${baseURL}${path}`, {
				method: 'GET',
				headers: defaultHeaders
			});

			return res.json();
		}
	};
};

export default httpClient({ baseURL: 'http://localhost:8080' });