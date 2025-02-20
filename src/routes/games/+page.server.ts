import { db } from "$lib/db";
import type { Player } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
    const players: Player[] = await db.query.playersTable.findMany();
    return { players };
};

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const team1 = [
            formData.get('team1_0'),
            formData.get('team1_1')
        ];
        const team2 = [
            formData.get('team2_0'),
            formData.get('team2_1')
        ];

        console.log('Team 1:', team1);
        console.log('Team 2:', team2);

        // Here you can process the teams,
        // e.g., save to a database or initiate a game.

        // Optionally return data to the client
        return { success: true };
    }
} satisfies Actions;
