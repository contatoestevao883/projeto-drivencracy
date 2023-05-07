import { Router } from "express"
import { createPoll, getPollChoices, getPolls, pollChoice, pollResult, pollVote } from "../controllers/poll.controllers.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { pollSchema } from "../schemas/poll.schemas.js"

const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), createPoll)
pollRouter.get("/poll", getPolls)
pollRouter.post("/choice", pollChoice)
pollRouter.get("/poll/:id/choice", getPollChoices)
pollRouter.post("/choice/:id/vote", pollVote)
pollRouter.get("/poll/:id/result", pollResult)

export default pollRouter