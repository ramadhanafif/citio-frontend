<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/id';

	import type { PageData } from './$types.js';
	import { PUBLIC_TIMEZONE } from '$env/static/public';

	export let data: PageData;
	dayjs.locale('id');
	dayjs.extend(utc);
	dayjs.extend(timezone);

	function getDate(input: string) {
		return dayjs.utc(input).tz(PUBLIC_TIMEZONE).locale('id').format('H:mm dddd DD MMMM');
	}

	function msgGenerate() {
		navigator.clipboard.writeText('halo bambang');
	}
</script>

<svelte:head>
	<title>CitiO - Class Tahsin Online</title>
</svelte:head>

<pre>{JSON.stringify(data.splitted, null, 2)}</pre>

<main class="container-fluid">
	{#each [...data.splitted] as [date, items]}
		<h2>{dayjs(date).locale('id').format('dddd DD MMMM')}</h2>
		<button style="width: fit-content;" on:click={msgGenerate}>Buat Pesan WA</button>
		<div class="grid-1">
			<div class="grid">
				{#each items as item}
					<article>
						<header><h3 class="title">{item.materi}</h3></header>
						<p>Pemateri: {item.pemateri}</p>
						<p>Pendamping: {item.pendamping}</p>
						<p>
							Waktu: {getDate(item.tanggal)}
						</p>
					</article>
				{/each}
			</div>
		</div>
	{/each}
</main>
<footer>
	<p>
		© {dayjs().year()} CitiO
	</p>
	<!-- <p>
		Created and designed by <a href="https://github.com/ramadhanafif">CitiO Team</a>
	</p> -->
	<small><a href="https://github.com/ramadhanafif/citio-frontend">Soruce Code</a></small>
</footer>

<style>
	.title {
		text-transform: capitalize;
	}

	.grid-1 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 0.8rem;
	}

	footer > * {
		padding: 0 1rem;
		margin: 0.5rem;
	}
</style>
