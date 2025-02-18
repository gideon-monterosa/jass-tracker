<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import type { ScoreItem } from '$lib/types/coiffeur-types';
	import { createEventDispatcher } from 'svelte';

	export let score: ScoreItem = { score: 0, scoreMultiplied: 0 };
	export let multiplicator: number = 1;
	const dispatch = createEventDispatcher();

	export const open = () => {
		isOpen = true;
		yourScore = score.score ?? 0;
		opponentScore = 157 - yourScore;
	};

	let isOpen: boolean = false;
	let yourScore: number = score?.score ?? 0;
	let opponentScore: number = 157 - (score?.score ?? 0);

	$: if (score) {
		score.score = yourScore ?? 0;
		score.scoreMultiplied = (score.score || 0) * multiplicator;
		dispatch('scoreChange', score);
	}

	$: yourScore = 157 - (opponentScore ?? 0);
</script>

<Modal bind:open={isOpen} size="md">
	<h3 slot="header" class="text-lg font-semibold">Score Details</h3>
	<div class="mb-4 text-lg">Current Score: {score.score}</div>
	<div class="mb-4 text-lg">Current Score Multiplied: {score.scoreMultiplied}</div>

	<div class="flex flex-col space-y-4">
		<div>
			<label for="yourScore" class="block text-sm font-medium text-gray-700">Your Score:</label>
			<input
				id="yourScore"
				type="number"
				bind:value={yourScore}
				class="w-full rounded border p-2"
			/>
		</div>
		<div>
			<label for="opponentScore" class="block text-sm font-medium text-gray-700"
				>Opponent's Score:</label
			>
			<input
				id="opponentScore"
				type="number"
				bind:value={opponentScore}
				class="w-full rounded border p-2"
			/>
		</div>
	</div>

	<div slot="footer" class="flex justify-end space-x-4">
		<button on:click={() => (isOpen = false)} class="rounded bg-blue-500 px-4 py-2 text-white"
			>Close</button
		>
	</div>
</Modal>
