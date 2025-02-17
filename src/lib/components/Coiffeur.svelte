<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	let items = [
		{
			mode: 'Herz',
			multiplicator: 1,
			score1: 157,
			score2: 157
		},
		{
			mode: 'Kreuz',
			multiplicator: 2,
			score1: 157,
			score2: 0
		}
	];

	const calculateScore = (team: number): number => {
		return items.map((x) => (team === 1 ? x.score1 : x.score2)).reduce((p, x) => p + x, 0);
	};

	$: team1Score = calculateScore(1);
	$: team2Score = calculateScore(2);
</script>

<Table {items}>
	<TableHead>
		<TableHeadCell></TableHeadCell>
		<TableHeadCell>Team 1</TableHeadCell>
		<TableHeadCell>Team 2</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each items as item}
			<TableBodyRow>
				<TableBodyCell>{item.mode}</TableBodyCell>
				<TableBodyCell>{item.score1}</TableBodyCell>
				<TableBodyCell>{item.score2}</TableBodyCell>
			</TableBodyRow>
		{/each}
		<TableBodyRow>
			<TableBodyCell>Total</TableBodyCell>
			<TableBodyCell>
				<span
					class={team1Score > team2Score
						? 'text-green-500'
						: team1Score < team2Score
							? 'text-red-500'
							: 'text-black'}
				>
					{team1Score}
				</span>
			</TableBodyCell>
			<TableBodyCell>
				<span
					class={team2Score > team1Score
						? 'text-green-500'
						: team2Score < team1Score
							? 'text-red-500'
							: 'text-black'}
				>
					{team2Score}
				</span>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
