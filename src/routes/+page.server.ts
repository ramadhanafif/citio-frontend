import { POCKETBASE_PASS, POCKETBASE_URL, POCKETBASE_USER } from '$env/static/private';
import type { PageServerLoad } from './$types.js';

import PocketBase from 'pocketbase';
import {
	Collections,
	type ClassSimpleResponse,
	type TypedPocketBase
} from '$lib/types/pocketbase-types.js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import locale_id from 'dayjs/locale/id';
import { PUBLIC_TIMEZONE } from '$env/static/public';

dayjs.extend(utc);
dayjs.extend(timezone);

const tz = PUBLIC_TIMEZONE || dayjs.tz.guess();
const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;

export const load: PageServerLoad = async ({}) => {
	if (!pb.authStore.isValid) {
		await pb.admins.authWithPassword(POCKETBASE_USER, POCKETBASE_PASS);
	}
	const today = dayjs();
	const future = dayjs().add(24 * 2, 'hour');

	const fetchResult = await pb.collection(Collections.ClassSimple).getList(1, 50, {
		sort: '-tanggal',
		filter: `tanggal <= "${future.format('YYYY-MM-DD HH:mm:ss')}" `
		//  && tanggal >= "${today.format('YYYY-MM-DD HH:mm:ss')}"`
	});

	return {
		fetchResult: fetchResult.items,
		splitted: splitDays(fetchResult.items)
	};
};

function splitDays(items: ClassSimpleResponse<unknown>[]) {
	const result: Map<string, ClassSimpleResponse<unknown>[]> = new Map();

	items.forEach((item) => {
		const date = dayjs.utc(item.tanggal).startOf('day').toISOString();

		const dateItems = result.get(date) || [];
		dateItems.push(item);

		result.set(date, dateItems);
	});
	// return Object.fromEntries(result);
	return result;
}
