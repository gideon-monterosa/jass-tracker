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

	const { gameRounds, team1, team2 } = data;

	let rounds: GameRound[] = gameRounds;

	let score: ScoreItem;
	let multiplicator: number;
	let scoreModalRef: ScoreModal;

	let team1Total = 0;
	let team2Total = 0;
	$: {
		team1Total = rounds.reduce((sum, round) => sum + round.score1.scoreMultiplied, 0);
		team2Total = rounds.reduce((sum, round) => sum + round.score2.scoreMultiplied, 0);
	}

	function handleScoreChange(event: CustomEvent<ScoreItem>) {
		if (score) {
			score.score = event.detail.score;
			score.scoreMultiplied = event.detail.scoreMultiplied;
			rounds = [...rounds];
		}
	}

	const openScoreModal = (s: ScoreItem, m: number) => {
		score = s;
		multiplicator = m;
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
						on:click={() => openScoreModal(round.score1, round.multiplicator)}
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
						on:click={() => openScoreModal(round.score2, round.multiplicator)}
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

<ScoreModal bind:this={scoreModalRef} {score} {multiplicator} on:scoreChange={handleScoreChange} />
