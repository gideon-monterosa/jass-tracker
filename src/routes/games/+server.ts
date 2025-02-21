import { saveOrUpdateScore } from "$lib/db/rounds";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        const { gameId, roundModeId, team, score, scoreMultiplied } = data;

        await saveOrUpdateScore({
            gameId: Number(gameId),
            roundModeId: Number(roundModeId),
            team,
            score: Number(score),
            scoreMultiplied: Number(scoreMultiplied)
        });

        return json({ success: true });
    } catch (error: any) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
};
