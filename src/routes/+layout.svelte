<script>
	import '../app.scss';
</script>

<svelte:head>
	<title>CitiO - Class Tahsin Online</title>
</svelte:head>

<nav>
	<ul>
		<li id="brand-container">
			<img src="/citio-square-bg.png" id="logo" alt="CitiO Logo" /><strong>CitiO</strong>
		</li>
	</ul>
	<ul>
		<li><a href="/create" role="button">Jadwal Baru</a></li>
	</ul>
</nav>

<slot />

<style>
	nav {
		padding: 0 1rem;
	}
	strong {
		color: hsl(207, 29.41%, 13.33%);
		font-size: 2rem;
	}

	#brand-container {
		height: 150px;
		display: flex;
		align-items: center;
	}
	#logo {
		border-radius: 100%;
		height: 100%;
	}

	:global(body) {
		background: lightblue;
		/* background: url(/mosque.jpg) no-repeat fixed center; */
		/* backdrop-filter: blur(100px); */
		height: 500px;
		padding: 0;
	}
</style>
