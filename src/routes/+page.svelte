<script lang="ts">
	import { GradientButton, Heading, Span } from 'flowbite-svelte';
</script>

<section class="container mx-auto px-4 py-12">
	<Heading tag="h1" class="mb-8 text-center">Jass <Span highlight>Coiffeur</Span> Tracker</Heading>
	<div class="flex flex-col items-center justify-center gap-4">
		<a class="w-xs" href="/games">
			<GradientButton outline color="cyanToBlue">New Game</GradientButton>
		</a>
		<a class="w-xs" href="/browse">
			<GradientButton outline color="cyanToBlue">Browse Games</GradientButton>
		</a>
		<a class="w-xs" href="/stats">
			<GradientButton outline color="cyanToBlue">Stats</GradientButton>
		</a>
	</div>
</section>
