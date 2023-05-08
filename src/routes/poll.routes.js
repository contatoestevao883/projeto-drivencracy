import { Router } from "express"
import { createPoll, getPolls } from "../controllers/poll.controllers.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { pollSchema } from "../schemas/poll.schemas.js"

const pollRouter = Router()

pollRouter.post("/poll", validateSchema(pollSchema), createPoll)
pollRouter.get("/poll", getPolls)


export default pollRouter