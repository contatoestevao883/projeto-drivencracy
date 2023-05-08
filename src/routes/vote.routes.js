import { Router } from "express"
import { pollResult, pollVote } from "../controllers/vote.controller.js"

const voteRouter = Router()

voteRouter.post("/choice/:id/vote", pollVote)
voteRouter.get("/poll/:id/result", pollResult)

export default voteRouter