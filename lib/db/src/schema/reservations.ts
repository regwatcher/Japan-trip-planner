import { pgTable, serial, text, integer, boolean, date, timestamp, unique } from "drizzle-orm/pg-core";

export const reservationsTable = pgTable(
  "reservations",
  {
    id: serial("id").primaryKey(),
    dayNumber: integer("day_number").notNull(),
    activityIndex: integer("activity_index").notNull(),
    required: boolean("required").notNull().default(false),
    deadline: date("deadline"),
    updatedBy: text("updated_by").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [unique("reservations_unique").on(table.dayNumber, table.activityIndex)]
);

export type Reservation = typeof reservationsTable.$inferSelect;
