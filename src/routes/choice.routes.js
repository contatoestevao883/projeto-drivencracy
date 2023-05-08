import { Router } from "express"
import { getPollChoices, pollChoice } from "../controllers/choice.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { choiceSchema } from "../schemas/choice.schemas.js"

const choicesRouter = Router()

choicesRouter.post("/choice", validateSchema(choiceSchema), pollChoice)
choicesRouter.get("/poll/choice", getPollChoices)

export default choicesRouter