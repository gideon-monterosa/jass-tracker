import { db } from '.';
import { roundModesTable, roundsTable } from './schema';
import { alias } from 'drizzle-orm/pg-core/alias';
import { eq, and } from 'drizzle-orm';

export async function loadGameRounds(game: { id: number }) {
	const rt1 = alias(roundsTable, 'rt1');
	const rt2 = alias(roundsTable, 'rt2');
	return db
		.select({
			mode: roundModesTable.name,
			modeId: roundModesTable.id,
			multiplicator: roundModesTable.multiplicator,
			score1: rt1.score,
			score1m: rt1.scoreMultiplied,
			score2: rt2.score,
			score2m: rt2.scoreMultiplied,
		})
		.from(roundModesTable)
		.leftJoin(
			rt1,
			and(
				eq(rt1.roundModeId, roundModesTable.id),
				eq(rt1.team, 'team1'),
				eq(rt1.gameId, game.id)
			)
		)
		.leftJoin(
			rt2,
			and(
				eq(rt2.roundModeId, roundModesTable.id),
				eq(rt2.team, 'team2'),
				eq(rt2.gameId, game.id)
			)
		);

}

export async function saveOrUpdateScore({
	gameId,
	roundModeId,
	team,
	score,
	scoreMultiplied
}: {
	gameId: number;
	roundModeId: number;
	team: 'team1' | 'team2';
	score: number;
	scoreMultiplied: number;
}): Promise<void> {
	await db
		.insert(roundsTable)
		.values({
			gameId,
			roundModeId,
			team,
			score,
			scoreMultiplied
		})
		.onConflictDoUpdate({
			target: [roundsTable.gameId, roundsTable.roundModeId, roundsTable.team],
			set: {
				score,
				scoreMultiplied
			}
		});
}
