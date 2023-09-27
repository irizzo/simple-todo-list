import httpClient from './http/client';
import dictionary from '@/resources/dictionary';

// get status list (all status)
export async function getStatusList() {
	console.log('[service getCategoriesList]');

	const getStatusListResponse = await httpClient.get({
		path: '/get-status-list'
	});

	return {
		status: getStatusListResponse.success,
		message: dictionary?.[getStatusListResponse.code]
	};
}
