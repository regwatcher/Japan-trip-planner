import { Router, type IRouter } from "express";
import { db, activityMovesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import {
  GetActivityMovesResponse,
  SetActivityMoveParams,
  SetActivityMoveBody,
  SetActivityMoveResponse,
  DeleteActivityMoveParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/activity-moves", async (_req, res) => {
  const moves = await db.select().from(activityMovesTable);
  const parsed = GetActivityMovesResponse.parse(
    moves.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))
  );
  res.json(parsed);
});

router.put("/activity-moves/:dayNumber/:activityIndex", async (req, res) => {
  const params = SetActivityMoveParams.parse(req.params);
  const body = SetActivityMoveBody.parse(req.body);

  const existing = await db
    .select()
    .from(activityMovesTable)
    .where(
      and(
        eq(activityMovesTable.dayNumber, params.dayNumber),
        eq(activityMovesTable.activityIndex, params.activityIndex)
      )
    )
    .limit(1);

  let result;
  if (existing.length > 0) {
    [result] = await db
      .update(activityMovesTable)
      .set({ targetDayNumber: body.targetDayNumber, movedBy: body.movedBy })
      .where(eq(activityMovesTable.id, existing[0].id))
      .returning();
  } else {
    [result] = await db
      .insert(activityMovesTable)
      .values({
        dayNumber: params.dayNumber,
        activityIndex: params.activityIndex,
        targetDayNumber: body.targetDayNumber,
        movedBy: body.movedBy,
      })
      .returning();
  }

  const parsed = SetActivityMoveResponse.parse({
    ...result,
    createdAt: result.createdAt.toISOString(),
  });
  res.json(parsed);
});

router.delete("/activity-moves/:dayNumber/:activityIndex", async (req, res) => {
  const params = DeleteActivityMoveParams.parse(req.params);
  await db
    .delete(activityMovesTable)
    .where(
      and(
        eq(activityMovesTable.dayNumber, params.dayNumber),
        eq(activityMovesTable.activityIndex, params.activityIndex)
      )
    );
  res.status(204).send();
});

export default router;
