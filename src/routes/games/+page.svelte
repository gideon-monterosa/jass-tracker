<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import type { Player } from '$lib/db/schema';

	export let data: PageData;
	const { players }: { players: Player[] } = data;

	let team1: (number | null)[] = [null, null];
	let team2: (number | null)[] = [null, null];

	function isPlayerSelectedElsewhere(
		playerId: number,
		currentTeam: 'team1' | 'team2',
		currentIndex: number
	): boolean {
		let otherSelections: (number | null)[] = [];
		if (currentTeam === 'team1') {
			otherSelections = [...team1.filter((_, i) => i !== currentIndex), ...team2];
		} else {
			otherSelections = [...team2.filter((_, i) => i !== currentIndex), ...team1];
		}
		return otherSelections.includes(playerId);
	}

	$: isTeamsValid = team1.every((p) => p !== null) && team2.every((p) => p !== null);
</script>

<form method="POST" class="flex flex-col items-center space-y-4">
	<div>
		<h2 class="mb-2 text-xl font-bold">Team 1</h2>
		<div class="flex space-x-2">
			{#each team1 as _, index}
				<select bind:value={team1[index]} name={'team1_' + index} class="rounded border p-2">
					<option value={null}>Spieler wählen</option>
					{#each players as player}
						<option
							value={player.id}
							disabled={isPlayerSelectedElsewhere(player.id, 'team1', index)}
						>
							{player.name}
						</option>
					{/each}
				</select>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Team 2</h2>
		<div class="flex space-x-2">
			{#each team2 as _, index}
				<select bind:value={team2[index]} name={'team2_' + index} class="rounded border p-2">
					<option value={null}>Spieler wählen</option>
					{#each players as player}
						<option
							value={player.id}
							disabled={isPlayerSelectedElsewhere(player.id, 'team2', index)}
						>
							{player.name}
						</option>
					{/each}
				</select>
			{/each}
		</div>
	</div>

	<GradientButton type="submit" outline color="cyanToBlue" disabled={!isTeamsValid}>
		Play
	</GradientButton>
</form>
