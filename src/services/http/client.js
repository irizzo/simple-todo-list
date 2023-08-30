const httpClient = ({ baseURL, customHeaders = {} }) => {
	const defaultHeaders = new Headers({
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			...customHeaders
		}
	});

	return {
		post: async ({ path, payload }) => {
			const request = await fetch(`${baseURL}/${path}`, {
				method: 'POST',
				headers: defaultHeaders,
				data: JSON.stringify(payload)
			});

			return request?.json();
		},
		get: async (path) => {
			const request = await fetch(`${baseURL}/${path}`, {
				method: 'GET',
				headers: defaultHeaders,
				data: JSON.stringify(payload)
			});

			return request?.json();
		}
	};
};

export default httpClient({ baseURL: process.env.BASE_API_URL });