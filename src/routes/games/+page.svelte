<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import type { Player } from '$lib/db/schema';
	export let data: PageData;

	const { players } = data;

	let team1: (Player | null)[] = [null, null];
	let team2: (Player | null)[] = [null, null];

	function isPlayerSelectedElsewhere(
		playerValue: Player,
		currentTeam: 'team1' | 'team2',
		currentIndex: number
	): boolean {
		if (currentTeam === 'team1') {
			return (
				team1.some((value, i) => i !== currentIndex && value === playerValue) ||
				team2.includes(playerValue)
			);
		} else {
			return (
				team2.some((value, i) => i !== currentIndex && value === playerValue) ||
				team1.includes(playerValue)
			);
		}
	}

	$: isTeamsValid = team1.every((p) => p !== null) && team2.every((p) => p !== null);

	function startGame() {
		if (isTeamsValid) {
			console.log(team1, team2);
			// window.location.href = '/games/1';
		}
	}
</script>

<div class="flex flex-col items-center space-y-4">
	<div>
		<h2 class="mb-2 text-xl font-bold">Team 1</h2>
		<div class="flex space-x-2">
			{#each team1 as selected, index}
				<select bind:value={team1[index]} class="rounded border p-2">
					<option value={null}>Spieler wählen</option>
					{#each players as player}
						<option value={player} disabled={isPlayerSelectedElsewhere(player, 'team1', index)}>
							{player.name}
						</option>
					{/each}
				</select>
			{/each}
		</div>
	</div>

	<!-- Team 2 Auswahl -->
	<div>
		<h2 class="mb-2 text-xl font-bold">Team 2</h2>
		<div class="flex space-x-2">
			{#each team2 as selected, index}
				<select bind:value={team2[index]} class="rounded border p-2">
					<option value={null}>Spieler wählen</option>
					{#each players as player}
						<option value={player} disabled={isPlayerSelectedElsewhere(player, 'team2', index)}>
							{player.name}
						</option>
					{/each}
				</select>
			{/each}
		</div>
	</div>

	<!-- Play Button, der nur aktiv ist, wenn beide Teams ausgewählt wurden -->
	<GradientButton outline color="cyanToBlue" disabled={!isTeamsValid} on:click={startGame}>
		Play
	</GradientButton>
</div>
