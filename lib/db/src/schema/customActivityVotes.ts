import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";

export const customActivityVotesTable = pgTable(
  "custom_activity_votes",
  {
    id: serial("id").primaryKey(),
    voter: text("voter").notNull(),
    customActivityId: integer("custom_activity_id").notNull(),
    voteType: text("vote_type", { enum: ["up", "neutral", "down"] }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique("custom_activity_votes_unique").on(table.voter, table.customActivityId)]
);

export type CustomActivityVote = typeof customActivityVotesTable.$inferSelect;
