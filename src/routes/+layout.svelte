<script>
	import '../app.pcss';
	import dayjs from 'dayjs';
</script>

<svelte:head>
	<title>CitiO - Class Tahsin Online</title>
</svelte:head>

<!--  https://daisyui.com/components/navbar/-->
<div class="flex min-h-screen flex-col">
	<header>
		<div class="navbar bg-base-100 border-b-base-300 border-b shadow-lg">
			<div class="navbar-start">
				<img src="/citio-square-bg.png" alt="Logo" class="rounded-badge h-10" />
				<a class="btn btn-ghost text-xl" href="/"> CitiO</a>
			</div>
			<div class="navbar-end">
				<a class="btn" href="/login"> Login</a>
				<!-- <a class="btn" href="/create">Jadwal Baru</a> -->
			</div>
		</div>
	</header>

	<div class="flex flex-1 flex-col px-6 pb-16 pt-4 sm:flex-row">
		<main class="flex-1">
			<slot />
		</main>
		<!-- <nav class="order-first sm:w-32 bg-purple-200">Sidebar</nav> -->
		<!-- <aside class="sm:w-32 bg-yellow-100">Right Sidebar</aside> -->
	</div>

	<footer>
		<p>
			© {dayjs().year()} CitiO
		</p>
		<!-- <p>
		Created and designed by <a href="https://github.com/ramadhanafif">CitiO Team</a>
	</p> -->
		<small><a href="https://github.com/ramadhanafif/citio-frontend">Soruce Code</a></small>
	</footer>
</div>
