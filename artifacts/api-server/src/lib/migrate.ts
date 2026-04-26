import { pool } from "@workspace/db";
import { logger } from "./logger";

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();
  try {
    logger.info("Running schema migrations…");

    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_moves (
        id                SERIAL PRIMARY KEY,
        day_number        INTEGER NOT NULL,
        activity_index    INTEGER NOT NULL,
        target_day_number INTEGER NOT NULL,
        moved_by          TEXT NOT NULL,
        created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT activity_moves_unique UNIQUE (day_number, activity_index)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id              SERIAL PRIMARY KEY,
        day_number      INTEGER NOT NULL,
        activity_index  INTEGER NOT NULL,
        required        BOOLEAN NOT NULL DEFAULT FALSE,
        deadline        DATE,
        updated_by      TEXT NOT NULL,
        updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT reservations_unique UNIQUE (day_number, activity_index)
      );
    `);

    logger.info("Schema migrations complete.");
  } finally {
    client.release();
  }
}
