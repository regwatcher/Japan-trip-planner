import { Router, type IRouter } from "express";
import { db, customActivitiesTable, activityCommentsTable, customActivityVotesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetCustomActivitiesResponse,
  GetCustomActivitiesResponseItem,
  CreateCustomActivityBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/custom-activities", async (_req, res) => {
  const rows = await db.select().from(customActivitiesTable).orderBy(customActivitiesTable.createdAt);
  const parsed = GetCustomActivitiesResponse.parse(
    rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString(), description: r.description ?? undefined }))
  );
  res.json(parsed);
});

router.post("/custom-activities", async (req, res) => {
  const body = CreateCustomActivityBody.parse(req.body);
  const [inserted] = await db
    .insert(customActivitiesTable)
    .values({
      dayNumber: body.dayNumber,
      proposedBy: body.proposedBy,
      name: body.name,
      description: body.description ?? null,
    })
    .returning();

  const parsed = GetCustomActivitiesResponseItem.parse({
    ...inserted,
    createdAt: inserted.createdAt.toISOString(),
    description: inserted.description ?? undefined,
  });
  res.status(201).json(parsed);
});

router.delete("/custom-activities/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  // Cascade: remove votes and comments tied to this custom activity
  await db.delete(customActivityVotesTable).where(eq(customActivityVotesTable.customActivityId, id));
  await db.delete(activityCommentsTable).where(eq(activityCommentsTable.customActivityId, id));
  await db.delete(customActivitiesTable).where(eq(customActivitiesTable.id, id));
  res.status(204).send();
});

export default router;
