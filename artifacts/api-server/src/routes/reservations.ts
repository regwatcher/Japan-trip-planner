import { Router, type IRouter } from "express";
import { db, reservationsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import {
  GetReservationsResponse,
  SetReservationParams,
  SetReservationBody,
  SetReservationResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/reservations", async (_req, res) => {
  const rows = await db.select().from(reservationsTable);
  const parsed = GetReservationsResponse.parse(
    rows.map((r) => ({ ...r, updatedAt: r.updatedAt.toISOString() }))
  );
  res.json(parsed);
});

router.put("/reservations/:dayNumber/:activityIndex", async (req, res) => {
  const params = SetReservationParams.parse(req.params);
  const body = SetReservationBody.parse(req.body);

  const existing = await db
    .select()
    .from(reservationsTable)
    .where(
      and(
        eq(reservationsTable.dayNumber, params.dayNumber),
        eq(reservationsTable.activityIndex, params.activityIndex)
      )
    )
    .limit(1);

  let result;
  if (existing.length > 0) {
    [result] = await db
      .update(reservationsTable)
      .set({
        required: body.required,
        deadline: body.deadline ?? null,
        updatedBy: body.updatedBy,
        updatedAt: new Date(),
      })
      .where(eq(reservationsTable.id, existing[0].id))
      .returning();
  } else {
    [result] = await db
      .insert(reservationsTable)
      .values({
        dayNumber: params.dayNumber,
        activityIndex: params.activityIndex,
        required: body.required,
        deadline: body.deadline ?? null,
        updatedBy: body.updatedBy,
      })
      .returning();
  }

  const parsed = SetReservationResponse.parse({
    ...result,
    updatedAt: result.updatedAt.toISOString(),
  });
  res.json(parsed);
});

export default router;
