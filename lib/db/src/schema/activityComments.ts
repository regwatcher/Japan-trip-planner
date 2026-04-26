import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const activityCommentsTable = pgTable("activity_comments", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  dayNumber: integer("day_number").notNull(),
  activityIndex: integer("activity_index"),
  customActivityId: integer("custom_activity_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ActivityComment = typeof activityCommentsTable.$inferSelect;
