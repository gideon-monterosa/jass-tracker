<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { ScoreItem, GameRound } from '$lib/types/coiffeur-types';

	import type { PageData } from './$types';
	import ScoreModal from '$lib/components/ScoreModal.svelte';

	export let data: PageData;

	const { gameId, gameRounds, team1, team2 } = data;

	let rounds: GameRound[] = gameRounds;

	let selectedRound: GameRound;
	let selectedScore: ScoreItem;
	let selectedTeam: 'team1' | 'team2';
	let selectedMultiplicator: number;
	let scoreModalRef: ScoreModal;

	let team1Total = 0;
	let team2Total = 0;
	$: {
		team1Total = rounds.reduce((sum, round) => sum + round.score1.scoreMultiplied, 0);
		team2Total = rounds.reduce((sum, round) => sum + round.score2.scoreMultiplied, 0);
	}

	function handleScoreChange(event: CustomEvent<ScoreItem>) {
		if (selectedScore) {
			selectedScore.score = event.detail.score;
			selectedScore.scoreMultiplied = event.detail.scoreMultiplied;
			rounds = [...rounds];
		}
	}

	async function handleModalClose() {
		if (gameId && selectedRound && selectedScore) {
			const data = {
				gameId,
				roundModeId: selectedRound.modeId,
				team: selectedTeam,
				score: selectedScore.score,
				scoreMultiplied: selectedScore.scoreMultiplied
			};

			try {
				const response = await fetch('./', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				});
				const result = await response.json();
				console.log('Score updated:', result);
			} catch (err) {
				console.error('Error updating score:', err);
			}
		}
	}

	const openScoreModal = (r: GameRound, s: ScoreItem, t: 'team1' | 'team2') => {
		selectedRound = r;
		selectedMultiplicator = r.multiplicator;
		selectedScore = s;
		selectedTeam = t;
		scoreModalRef.open();
	};
</script>

<Table items={rounds}>
	<TableHead>
		<TableHeadCell></TableHeadCell>
		<TableHeadCell>{team1}</TableHeadCell>
		<TableHeadCell>{team2}</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each rounds as round}
			<TableBodyRow>
				<TableBodyCell>
					<span class="inline-block w-[3ch]">x{round.multiplicator}</span>
					<span>{round.mode}</span>
				</TableBodyCell>
				<TableBodyCell>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						on:click={() => openScoreModal(round, round.score1, 'team1')}
						class="flex cursor-pointer items-center gap-2"
					>
						<span class="inline-block w-[3ch]">{round.score1.score}</span>
						<span class="inline-block w-[3ch]">{round.score1.scoreMultiplied}</span>
					</div>
				</TableBodyCell>
				<TableBodyCell>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						on:click={() => openScoreModal(round, round.score2, 'team2')}
						class="flex cursor-pointer items-center gap-2"
					>
						<span class="inline-block w-[3ch]">{round.score2.score}</span>
						<span class="inline-block w-[3ch]">{round.score2.scoreMultiplied}</span>
					</div>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
		<TableBodyRow>
			<TableBodyCell>Total</TableBodyCell>
			<TableBodyCell>
				<span
					class={team1Total > team2Total
						? 'text-green-500'
						: team1Total < team2Total
							? 'text-red-500'
							: 'text-white'}
				>
					{team1Total}
				</span>
			</TableBodyCell>
			<TableBodyCell>
				<span
					class={team2Total > team1Total
						? 'text-green-500'
						: team2Total < team1Total
							? 'text-red-500'
							: 'text-white'}
				>
					{team2Total}
				</span>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>

<ScoreModal
	bind:this={scoreModalRef}
	score={selectedScore}
	multiplicator={selectedMultiplicator}
	on:scoreChange={handleScoreChange}
	on:close={handleModalClose}
/>
