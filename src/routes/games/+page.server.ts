import { db } from "$lib/db";
import { gamePlayersTable, gamesTable, type Player } from "$lib/db/schema";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
    const players: Player[] = await db.query.playersTable.findMany();
    return { players };
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const team1Ids = [
            Number(formData.get('team1_0')),
            Number(formData.get('team1_1'))
        ];
        const team2Ids = [
            Number(formData.get('team2_0')),
            Number(formData.get('team2_1'))
        ];

        const game = await db.transaction(async (tx) => {
            const [insertedGame] = await tx
                .insert(gamesTable)
                .values({})
                .returning({ id: gamesTable.id });

            for (const playerId of team1Ids) {
                await tx.insert(gamePlayersTable).values({
                    gameId: insertedGame.id,
                    playerId,
                    team: 'team1'
                });
            }

            for (const playerId of team2Ids) {
                await tx.insert(gamePlayersTable).values({
                    gameId: insertedGame.id,
                    playerId,
                    team: 'team2'
                });
            }

            return insertedGame;
        });

        if (game === undefined) {
            return { success: false };
        }

        redirect(303, `/games/${game.id}`);
    }
} satisfies Actions;
