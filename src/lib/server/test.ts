import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import locale_id from 'dayjs/locale/id';

dayjs.locale('id');
dayjs.extend(utc);
dayjs.extend(timezone);

const timestamp = '2014-06-01 10:00';
const tz = 'Asia/Jakarta';

console.log(locale_id);
console.log(dayjs().locale(locale_id).format('dddd, MMMM D YYYY, h:mm:ss A'));
console.log(dayjs.tz(timestamp, tz).format('H:mm:ss Z'));
console.log(dayjs.utc(timestamp).tz(tz).format('dddd, MMMM D YYYY, H:mm:ss Z'));

// dayjs.tz.setDefault(tz);

const dayjsUTC = dayjs(timestamp); //assumes UTC
//dayjsUTC.toISOString() -> 2014-06-01T12:00:00.000Z
//dayjsUTC.format('YYYY-MM-DDTHH:mm:ss') -> 2014-06-01T12:00:00

const dayjsAmerica = dayjsUTC.tz(tz); //existing time treated as UTC
//dayjsAmerica.toISOString() -> 2014-06-01T12:00:00.000Z
//dayjsAmerica.format('YYYY-MM-DDTHH:mm:ss') -> 2014-06-01T08:00:00

const dayjsAmericaKeep = dayjsUTC.tz(tz, true); //existing time treated as local time
//dayjsAmericaKeep.toISOString() -> 2014-06-01T16:00:00.000Z
//dayjsAmericaKeep.format('YYYY-MM-DDTHH:mm:ss') -> 2014-06-01T12:00:00

console.log(dayjsUTC.toString());
console.log(dayjsAmerica.toString());
console.log(dayjsAmericaKeep.toString());
console.log({ local: dayjs.utc().local().format('dddd H:mm:ss Z') });

{
	const x = {
		timestamp,
		day: dayjs.utc(timestamp).get('day'),
		daystart: dayjs.utc(timestamp).startOf('day').format('dddd H:mm:ss Z'),
		dayname: dayjs.utc(timestamp).format('dddd')
	};
	console.log(x);
}

import PocketBase from 'pocketbase';
// import { POCKETBASE_PASS, POCKETBASE_URL, POCKETBASE_USER } from '$env/static/private';
import { Collections, type TypedPocketBase } from '$lib/types/pocketbase-types.js';

const POCKETBASE_URL = 'https://ctonline.cloud';
const POCKETBASE_USER = 'ramadhanafif@gmail.com';
const POCKETBASE_PASS = 'adminadmin';

async function main() {
	const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
	await pb.admins.authWithPassword(POCKETBASE_USER, POCKETBASE_PASS);

	const full = await pb.collection(Collections.ClassSimple).getFullList();
	console.log(full);

	const updates = full.map((item) => {
		const temp = item;
		temp.tanggal = dayjs.utc(temp.tanggal).subtract(14, 'hours').toISOString();
		return temp;
	});

	updates.forEach(async (entry) => {
		const result = await pb.collection(Collections.ClassSimple).update(entry.id, entry);
		console.log(result);
	});
}

// main();
