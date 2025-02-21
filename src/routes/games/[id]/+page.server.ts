import { error } from '@sveltejs/kit';
import { gamesTable, gamePlayersTable, playersTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
import { db } from '$lib/db';
import type { GameRound } from '$lib/types/coiffeur-types';
import { loadGameRounds } from '$lib/db/rounds';

export const load: PageServerLoad = async ({ params }: any) => {
    const gameId = Number(params.id);

    const gameRows = await db
        .select()
        .from(gamesTable)
        .where(eq(gamesTable.id, gameId))
        .limit(1);

    if (!gameRows || gameRows.length === 0) {
        throw error(404, 'Game not found');
    }

    const game = gameRows[0];
    const result = await loadGameRounds(game);
    const gameRounds: GameRound[] = result.map(r => {
        return {
            mode: r.mode,
            modeId: r.modeId,
            multiplicator: r.multiplicator,
            score1: {
                score: Number(r.score1),
                scoreMultiplied: Number(r.score1m)
            },
            score2: {
                score: Number(r.score2),
                scoreMultiplied: Number(r.score2m)
            }
        }
    });

    const gamePlayers = await db
        .select({
            playerId: gamePlayersTable.playerId,
            team: gamePlayersTable.team,
            playerName: playersTable.name
        })
        .from(gamePlayersTable)
        .leftJoin(playersTable, eq(playersTable.id, gamePlayersTable.playerId))
        .where(eq(gamePlayersTable.gameId, gameId));

    const team1 = gamePlayers.filter((gp) => gp.team === 'team1').map(p => p.playerName).join(' & ');
    const team2 = gamePlayers.filter((gp) => gp.team === 'team2').map(p => p.playerName).join(' & ');

    return {
        gameId,
        gameRounds,
        team1,
        team2
    };
};

