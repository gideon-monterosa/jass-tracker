import { db } from "$lib/db";
import type { Player } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const players: Player[] = await db.query.playersTable.findMany();
    return { players };
};
