<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/id';

	import type { PageData } from './$types.js';
	import { PUBLIC_TIMEZONE } from '$env/static/public';
	import { fly } from 'svelte/transition';

	import whatsappIcon from './whatsapp-logo.svg';
	import Alert from '$lib/components/Alert.svelte';

	export let data: PageData;
	dayjs.locale('id');
	dayjs.extend(utc);
	dayjs.extend(timezone);

	function getDate(input: string) {
		return dayjs.utc(input).tz(PUBLIC_TIMEZONE).locale('id').format('H:mm dddd DD MMMM');
	}

	function msgGenerate() {
		navigator.clipboard.writeText('halo bambang');
		copyAlert = true;
		setTimeout(() => {
			copyAlert = false;
		}, 3000);
	}

	let copyAlert = false;
</script>

<svelte:head>
	<title>CitiO - Class Tahsin Online</title>
</svelte:head>

<!-- <pre>{JSON.stringify(data.splitted, null, 2)}</pre> -->

<main class="container">
	{#each [...data.splitted] as [date, items]}
		<!--  Date Separation -->
		<div class="prose-xl my-4 flex items-center justify-between">
			<h2>{dayjs(date).locale('id').format('dddd DD MMMM')}</h2>
			<button class="btn btn-primary" on:click={msgGenerate}
				>Buat dan Copy Pesan WA
				<img src={whatsappIcon} alt="wa logo" class="m-0 h-6 w-6" /></button
			>
		</div>
		<!-- Card separation -->
		<div class="border-accent-content flex flex-wrap gap-4 border-b px-2 shadow-lg">
			{#each items as item}
				<article class="card bg-base-100 flex-none basis-96 border px-4 pb-4 pt-2">
					<h3 class="card-title">{item.materi}</h3>
					<p><strong>Pemateri</strong>: {item.pemateri}</p>
					<p><strong>Pendamping</strong>: {item.pendamping}</p>
					<p>
						<strong>Waktu</strong>: {getDate(item.tanggal)}
					</p>
				</article>
			{/each}
		</div>
	{/each}

	{#if copyAlert}
		<div in:fly={{x:100, delay:1}} class="fixed bottom-3 right-3">
			<Alert text="Copy berhasil!" />
		</div>
	{/if}
</main>
