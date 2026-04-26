import { Router, type IRouter } from "express";
import { db, votesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import {
  GetVotesResponse,
  CastVoteParams,
  CastVoteBody,
  CastVoteResponse,
  DeleteVoteParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/votes", async (_req, res) => {
  const votes = await db.select().from(votesTable);
  const parsed = GetVotesResponse.parse(
    votes.map((v) => ({
      ...v,
      createdAt: v.createdAt.toISOString(),
      updatedAt: v.updatedAt.toISOString(),
    }))
  );
  res.json(parsed);
});

router.put("/votes/:voter/:dayNumber/:activityIndex", async (req, res) => {
  const params = CastVoteParams.parse(req.params);
  const body = CastVoteBody.parse(req.body);

  const existing = await db
    .select()
    .from(votesTable)
    .where(
      and(
        eq(votesTable.voter, params.voter),
        eq(votesTable.dayNumber, params.dayNumber),
        eq(votesTable.activityIndex, params.activityIndex)
      )
    )
    .limit(1);

  let result;
  if (existing.length > 0) {
    const [updated] = await db
      .update(votesTable)
      .set({ voteType: body.voteType, updatedAt: new Date() })
      .where(eq(votesTable.id, existing[0].id))
      .returning();
    result = updated;
  } else {
    const [inserted] = await db
      .insert(votesTable)
      .values({
        voter: params.voter,
        dayNumber: params.dayNumber,
        activityIndex: params.activityIndex,
        voteType: body.voteType,
      })
      .returning();
    result = inserted;
  }

  const parsed = CastVoteResponse.parse({
    ...result,
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
  });
  res.json(parsed);
});

router.delete("/votes/:voter/:dayNumber/:activityIndex", async (req, res) => {
  const params = DeleteVoteParams.parse(req.params);

  await db
    .delete(votesTable)
    .where(
      and(
        eq(votesTable.voter, params.voter),
        eq(votesTable.dayNumber, params.dayNumber),
        eq(votesTable.activityIndex, params.activityIndex)
      )
    );

  res.status(204).send();
});

export default router;
