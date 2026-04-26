import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const votesTable = pgTable(
  "votes",
  {
    id: serial("id").primaryKey(),
    voter: text("voter").notNull(),
    dayNumber: integer("day_number").notNull(),
    activityIndex: integer("activity_index").notNull(),
    voteType: text("vote_type", { enum: ["up", "neutral", "down"] }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique("votes_unique").on(table.voter, table.dayNumber, table.activityIndex)]
);

export const insertVoteSchema = createInsertSchema(votesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votesTable.$inferSelect;
