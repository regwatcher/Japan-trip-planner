import { pgTable, serial, text, integer, timestamp, unique } from "drizzle-orm/pg-core";

export const activityMovesTable = pgTable(
  "activity_moves",
  {
    id: serial("id").primaryKey(),
    dayNumber: integer("day_number").notNull(),
    activityIndex: integer("activity_index").notNull(),
    targetDayNumber: integer("target_day_number").notNull(),
    movedBy: text("moved_by").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [unique("activity_moves_unique").on(table.dayNumber, table.activityIndex)]
);

export type ActivityMove = typeof activityMovesTable.$inferSelect;
