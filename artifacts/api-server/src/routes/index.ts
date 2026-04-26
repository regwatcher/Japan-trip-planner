import { Router, type IRouter } from "express";
import healthRouter from "./health";
import votesRouter from "./votes";
import customActivitiesRouter from "./customActivities";
import commentsRouter from "./comments";
import customActivityVotesRouter from "./customActivityVotes";
import activityMovesRouter from "./activityMoves";
import reservationsRouter from "./reservations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(votesRouter);
router.use(customActivitiesRouter);
router.use(commentsRouter);
router.use(customActivityVotesRouter);
router.use(activityMovesRouter);
router.use(reservationsRouter);

export default router;
