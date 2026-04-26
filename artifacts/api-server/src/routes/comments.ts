import { Router, type IRouter } from "express";
import { db, activityCommentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetCommentsResponse,
  GetCommentsResponseItem,
  PostCommentBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/comments", async (_req, res) => {
  const rows = await db.select().from(activityCommentsTable).orderBy(activityCommentsTable.createdAt);
  const parsed = GetCommentsResponse.parse(
    rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      activityIndex: r.activityIndex ?? undefined,
      customActivityId: r.customActivityId ?? undefined,
    }))
  );
  res.json(parsed);
});

router.post("/comments", async (req, res) => {
  const body = PostCommentBody.parse(req.body);
  const [inserted] = await db
    .insert(activityCommentsTable)
    .values({
      author: body.author,
      dayNumber: body.dayNumber,
      activityIndex: body.activityIndex ?? null,
      customActivityId: body.customActivityId ?? null,
      content: body.content,
    })
    .returning();

  const parsed = GetCommentsResponseItem.parse({
    ...inserted,
    createdAt: inserted.createdAt.toISOString(),
    activityIndex: inserted.activityIndex ?? undefined,
    customActivityId: inserted.customActivityId ?? undefined,
  });
  res.status(201).json(parsed);
});

router.delete("/comments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(activityCommentsTable).where(eq(activityCommentsTable.id, id));
  res.status(204).send();
});

export default router;
