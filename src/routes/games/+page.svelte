<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const { players } = data;
	// We'll track the selected player's id (or you could store the whole object)
	let selectedPlayerId: number | null = null;

	function selectPlayer(playerId: number) {
		selectedPlayerId = playerId;
	}
</script>

<div class="flex flex-col items-center">
	{#each players as player}
		<div
			on:click={() => selectPlayer(player.id)}
			class="m-2 cursor-pointer rounded border p-2"
			class:selected={selectedPlayerId === player.id}
		>
			{player.name}
		</div>
	{/each}

	{#if selectedPlayerId !== null}
		<!-- You could use the selected player's id in your link, form, etc. -->
		<a href={`/games/${selectedPlayerId}`}>
			<GradientButton outline color="cyanToBlue">Play</GradientButton>
		</a>
	{/if}
</div>

<style>
	/* Optional: style a selected player */
	.selected {
		background-color: #d1fae5; /* a light green background */
		border-color: #10b981;
	}
</style>
