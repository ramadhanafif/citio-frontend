<script lang="ts">
	import dayjs from 'dayjs';
	import type { PageData } from './$types.js';
	import { PUBLIC_TIMEZONE } from '$env/static/public';

	export let data: PageData;
	dayjs.locale('id');
</script>

<svelte:head>
	<title>CitiO - Class Tahsin Online</title>
</svelte:head>

<main class="container">
	<div class="grid-1">
		{#each data.fetchResult as item}
			<article>
				<header><h3 class="title">{item.materi}</h3></header>
				<p>Pemateri: {item.pemateri}</p>
				<p>Pendamping: {item.pendamping}</p>
				<p>
					Waktu: {dayjs
						.utc(item.tanggal)
						.tz(PUBLIC_TIMEZONE)
						.locale('id')
						.format('H:mm dddd DD MMMM')}
				</p>
			</article>
		{/each}
	</div>
</main>
<footer>
	<p>
		© {dayjs().year()} CitiO
	</p>
	<p>
		Created and designed by <a href="https://github.com/ramadhanafif">CitiO Team</a>
	</p>
	<!-- <small><a href="https://github.com/ramadhanafif/citio-frontend">Soruce Code</a></small> -->
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
