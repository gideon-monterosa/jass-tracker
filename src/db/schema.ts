import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
});

export const gamesTable = pgTable("games", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export const roundsTable = pgTable("rounds", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	gameId: integer("game_id")
		.notNull()
		.references(() => gamesTable.id),
});
