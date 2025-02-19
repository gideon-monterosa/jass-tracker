<script lang="ts">
	import { GradientButton, Heading } from 'flowbite-svelte';
</script>

<section class="container mx-auto px-4 py-12">
	<Heading tag="h1" class="mb-8 text-center">Jass Coiffeur Tracker</Heading>
	<div class="flex flex-wrap justify-center gap-4">
		<a href="/games"> <GradientButton outline color="cyanToBlue">New Game</GradientButton></a>
		<a href="/browse"><GradientButton outline color="cyanToBlue">Browse Games</GradientButton></a>
		<a href="/stats"><GradientButton outline color="cyanToBlue">Stats</GradientButton></a>
	</div>
</section>
