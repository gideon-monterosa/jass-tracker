import type { InferSelectModel } from "drizzle-orm";
import { integer, pgEnum, pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
});
export type Player = InferSelectModel<typeof playersTable>;

export const gamesTable = pgTable("games", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	startedAt: timestamp("started_at", { mode: "date" })
		.notNull()
		.defaultNow(),
});

export const teamEnum = pgEnum("team", ["team1", "team2"]);

export const gamePlayersTable = pgTable(
	"game_players",
	{
		gameId: integer("game_id")
			.notNull()
			.references(() => gamesTable.id),
		playerId: integer("player_id")
			.notNull()
			.references(() => playersTable.id),
		team: teamEnum("team").notNull(),
	},
	(t) => [
		primaryKey({ columns: [t.gameId, t.playerId] })
	]
);

export const roundModesTable = pgTable("round_modes", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	multiplicator: integer().notNull()
})

export const roundsTable = pgTable("rounds", {
	gameId: integer("game_id")
		.notNull()
		.references(() => gamesTable.id),
	roundModeId: integer("round_mode_id")
		.notNull()
		.references(() => roundModesTable.id),
	team: teamEnum("team").notNull(),
	score: integer(),
	scoreMultiplied: integer("score_multiplied")
},
	(t) => [
		primaryKey({ columns: [t.gameId, t.roundModeId, t.team] })
	]
);
