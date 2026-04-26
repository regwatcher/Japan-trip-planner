import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const customActivitiesTable = pgTable("custom_activities", {
  id: serial("id").primaryKey(),
  dayNumber: integer("day_number").notNull(),
  proposedBy: text("proposed_by").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CustomActivity = typeof customActivitiesTable.$inferSelect;
