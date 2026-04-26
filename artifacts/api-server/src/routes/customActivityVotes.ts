import { Router, type IRouter } from "express";
import { db, customActivityVotesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import {
  GetCustomActivityVotesResponse,
  CastCustomActivityVoteParams,
  CastCustomActivityVoteBody,
  CastCustomActivityVoteResponse,
  DeleteCustomActivityVoteParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/custom-activity-votes", async (_req, res) => {
  const rows = await db.select().from(customActivityVotesTable);
  const parsed = GetCustomActivityVotesResponse.parse(
    rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }))
  );
  res.json(parsed);
});

router.put("/custom-activity-votes/:voter/:customActivityId", async (req, res) => {
  const params = CastCustomActivityVoteParams.parse(req.params);
  const body = CastCustomActivityVoteBody.parse(req.body);

  const existing = await db
    .select()
    .from(customActivityVotesTable)
    .where(
      and(
        eq(customActivityVotesTable.voter, params.voter),
        eq(customActivityVotesTable.customActivityId, params.customActivityId)
      )
    )
    .limit(1);

  let result;
  if (existing.length > 0) {
    const [updated] = await db
      .update(customActivityVotesTable)
      .set({ voteType: body.voteType, updatedAt: new Date() })
      .where(eq(customActivityVotesTable.id, existing[0].id))
      .returning();
    result = updated;
  } else {
    const [inserted] = await db
      .insert(customActivityVotesTable)
      .values({
        voter: params.voter,
        customActivityId: params.customActivityId,
        voteType: body.voteType,
      })
      .returning();
    result = inserted;
  }

  const parsed = CastCustomActivityVoteResponse.parse({
    ...result,
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
  });
  res.json(parsed);
});

router.delete("/custom-activity-votes/:voter/:customActivityId", async (req, res) => {
  const params = DeleteCustomActivityVoteParams.parse(req.params);
  await db
    .delete(customActivityVotesTable)
    .where(
      and(
        eq(customActivityVotesTable.voter, params.voter),
        eq(customActivityVotesTable.customActivityId, params.customActivityId)
      )
    );
  res.status(204).send();
});

export default router;
